import { useContext, useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { Summary } from "../../components/Summary"
import { TransactionsContext } from "../../contexts/TransactionsContexts"
import { dateFormatter, priceFormatter } from "../../utils/formater"
import { SearchForm } from "./components/SearchForm"
import { PriceHighLight, TransactionsContainer, TransactionsTable } from "./styles"

interface Transaction {
    id: number,
    description: string,
    type: 'income' | 'outcome',
    price: number,
    category: string,
    createdAt: string
}

export function Transactions() {

    const { transactions } = useContext(TransactionsContext)

    return (
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SearchForm />

                <TransactionsTable>
                    <tbody>
                        {transactions.map(transaction => {
                            return (
                                <tr key={transaction.id}>
                                    <td width="50%">{transaction.description}</td>
                                    <td>
                                        <PriceHighLight variant={transaction.type}>
                                            {transaction.type === 'outcome' && '- '}
                                            {priceFormatter.format(transaction.price)}
                                        </PriceHighLight>
                                    </td>
                                    <td>{transaction.category}</td>
                                    <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}