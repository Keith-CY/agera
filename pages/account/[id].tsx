import { GetServerSideProps } from 'next'
import TxList from 'components/TxList'
import { useTranslation } from 'utils/i18n'

interface Tx {
  hash: string
  type: string
  from: string
  to: string
  amount: string
  fee: string
  createdAt: string
}

interface State {
  id: string
  nonce: string
  txList: Array<Tx>
}
const Account = ({ id, nonce, txList }: State) => {
  const [t] = useTranslation('account')
  const infoList = [
    {
      label: 'id',
      value: id,
    },
    {
      label: 'nonce',
      value: nonce,
    },
  ]
  return (
    <main>
      <div className="basic-info-list">
        {infoList.map(info => (
          <div key={info.label}>
            <span>{t(info.label)}</span>
            <div>{info.value}</div>
          </div>
        ))}
      </div>
      <TxList list={txList} />
    </main>
  )
}

export const getServerSideProps: GetServerSideProps<State, { id: string }> = async context => {
  const { id } = context.params
  return {
    props: {
      id,
      nonce: `nonce-of-${id}`,
      txList: Array.from({ length: 10 }).map((_, idx) => ({
        hash: `tx-hash-${idx}`,
        type: `type-${idx}`,
        from: `from-${idx}`,
        to: `to-${idx}`,
        amount: `amount-${idx}`,
        fee: `fee-${idx}`,
        createdAt: Date.now().toString(),
      })),
    },
  }
}
export default Account
