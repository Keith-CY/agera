import { useState } from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { fetchBlock, handleApiError, API, formatDatetime, ckbExplorerUrl } from 'utils'
import CardFieldsetList from 'components/CardFieldsetList'

type State = API.Block.Parsed

const Block = (initState: State) => {
  const [block, setBlock] = useState(initState)
  const [t] = useTranslation('block')

  const fieldsetList: Array<Array<{ label: Exclude<keyof State, 'number'>; value: React.ReactNode }>> = [
    [
      {
        label: 'timestamp',
        value: (
          <time dateTime={new Date(+block.timestamp).toISOString()} title={t('timestamp')}>
            {formatDatetime(+block.timestamp)}
          </time>
        ),
      },
      {
        label: 'l1Block',
        value: (
          <Link href={`${ckbExplorerUrl}/block/${block.l1Block}`}>
            <div>
              #<a title={t('l1Block')}>{Number(block.l1Block).toLocaleString('en')}</a>
            </div>
          </Link>
        ),
      },
      {
        label: 'txHash',
        value: (
          <Link href={`${ckbExplorerUrl}/transaction/${block.txHash}`}>
            <a title={t('txHash')}>{block.txHash}</a>
          </Link>
        ),
      },
    ],
    [
      {
        label: 'finalizeState',
        value: <span title={t('finalizeState')}>{block.finalizeState}</span>,
      },
      {
        label: 'txCount',
        value: <span title={t('txCount')}>{Number(block.txCount).toLocaleString('en')}</span>,
      },
      {
        label: 'aggregator',
        value: <span title={t('aggregator')}>{block.aggregator}</span>,
      },
    ],
  ]
  return (
    <div className="card-container mt-8">
      <h2 className="card-header">
        {t('block')}
        <span>{`#${Number(block.number).toLocaleString('en')}`}</span>
      </h2>
      <CardFieldsetList fieldsetList={fieldsetList} t={t} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<State> = async ({ locale, res, params }) => {
  const { id } = params
  try {
    const block = await fetchBlock(id as string)
    const lng = await serverSideTranslations(locale, ['block'])
    return { props: { ...block, ...lng } }
  } catch (err) {
    return handleApiError(err, res)
  }
}

export default Block