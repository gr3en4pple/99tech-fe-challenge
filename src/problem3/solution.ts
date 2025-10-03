interface WalletBalance {
  currency: string
  amount: number
  blockchain: string // Added missing blockchain property
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string
  priority: number // Cache priority to avoid recalculating in function below
}

interface BoxProps extends React.PropsWithChildren {
  [key: string]: any
}

interface Props extends BoxProps {}

// move this outside of component since it is not dependent on the component state or props
// this function might be placed in a utils.ts file if we want to reuse for other components
const getPriority = (blockchain: string): number => {
  // Using object is faster than switch statements
  // and easier to maintain when adding new key, value pairs.
  const priorityMap: Record<string, number> = {
    Osmosis: 100,
    Ethereum: 50,
    Arbitrum: 30,
    Zilliqa: 20,
    Neo: 20
  }
  // Default return is -99
  return priorityMap[blockchain] ?? -99
}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props
  const balances = useWalletBalances()
  const prices = usePrices()

  // 1. lhsPriority was undefined variable - should be balancePriority
  // 2. Filter logic might be wrong - we want balancePriority > -99 and amounts > 0, not <= 0
  // 3. formattedBalances variable was removed, array map with formatted and priority variables was used instead
  // 4. Array.sort was missing return 0
  // 5. Removed prices from dependencies
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain)
        return balancePriority > -99 && balance.amount > 0
      })
      .map((balance: WalletBalance) => ({
        ...balance,
        formatted: balance.amount.toFixed(2), // formatting with 2 decimal places
        priority: getPriority(balance.blockchain) // Cache priority for sorting
      }))
      .sort((a: FormattedWalletBalance, b: FormattedWalletBalance) => {
        return b.priority - a.priority // sort higher priority first
      })
  }, [balances, getPriority]) // Removed prices dependency

  // Memoize the rows for better UX performance
  const rows = useMemo(() => {
    return sortedBalances.map((balance: FormattedWalletBalance) => {
      const usdValue = prices[balance.currency] * balance.amount
      return (
        <WalletRow
          className={classes.row}
          // Use unique key instead of index
          key={`${balance.currency}-${balance.blockchain}`}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    })
  }, [sortedBalances, prices])

  return <div {...rest}>{rows}</div>
}
