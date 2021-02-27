import { useState } from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useTranslation, formatDatetime, fetchTx, API, handleApiError, ckbExplorerUrl } from 'utils'
import CardFieldsetList from 'components/CardFieldsetList'
type State = API.Tx.Parsed

const Tx = (initState: State) => {
  const [tx, setTx] = useState(initState)
  const [t] = useTranslation('tx')
  const fieldsetList = [
    [
      { label: 'timestamp', value: formatDatetime(+tx.timestamp) },
      {
        label: 'l2Block',
        value: (
          <Link href={`/block/${tx.l2Block}`}>
            <a>{tx.l2Block}</a>
          </Link>
        ),
      },
      {
        label: 'l1Block',
        value: (
          <Link href={`${ckbExplorerUrl}/block/${tx.l1Block}`}>
            <a>{tx.l1Block}</a>
          </Link>
        ),
      },
      { label: 'type', value: tx.type },
      { label: 'finalizeState', value: tx.finalizeState },
    ],
    [
      { label: 'nonce', value: tx.nonce },
      { label: 'args', value: tx.args },
      { label: 'gasPrice', value: tx.gasPrice },
      { label: 'fee', value: tx.fee },
    ],
  ]
  return (
    <div className="card-container">
      <h2 className="card-header border-b pb-3">{`${t('hash')} #${tx.hash}`}</h2>
      <div className="flex justify-center items-center border-b py-3 ">
        <span className="flex-1 text-right">
          {t('from')}
          <Link href={`/account/${tx.from}`}>
            <a>{tx.from}</a>
          </Link>
        </span>
        {'>>>'}
        <span className="flex-1">
          {t('to')}
          <Link href={`/account/${tx.to}`}>
            <a>{tx.to}</a>
          </Link>
        </span>
      </div>
      <CardFieldsetList fieldsetList={fieldsetList} t={t}/>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<State, { hash: string }> = async ({ res, params }) => {
  const { hash } = params
  try {
    const tx = await fetchTx(hash)
    return { props: tx }
  } catch (err) {
    return handleApiError(err, res)
  }
}
export default Tx
