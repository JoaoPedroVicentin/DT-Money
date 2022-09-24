import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'
import { X, ArrowCircleUp, ArrowCircleDown } from 'phosphor-react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from "react-hook-form";
import { useContext } from 'react'
import { TransactionsContext } from '../../contexts/TransactionsContexts'

const newTransactionForSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome'])
})

type NewTransactionFormInput = z.infer<typeof newTransactionForSchema>

export function NewTransactionModal() {

    const { createTransaction } = useContext(TransactionsContext)

    const { register, handleSubmit, formState: { isSubmitting }, control, reset } = useForm<NewTransactionFormInput>({
        resolver: zodResolver(newTransactionForSchema)
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInput) {

        const { description, type, price, category} = data

        await createTransaction({
            description,
            price,
            category,
            type
        })
    }

    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>Nova Transação</Dialog.Title>

                <CloseButton>
                    <X />
                </CloseButton>

                <form action='' onSubmit={handleSubmit(handleCreateNewTransaction)} >
                    <input type='text' placeholder='Descrição' required {...register('description')} />
                    <input type='number' placeholder='Preço' required {...register('price', { valueAsNumber: true })} />
                    <input type='text' placeholder='Categoria' required {...register('category')} />

                    <Controller control={control} name="type" 
                    
                    render={({field}) => {
                        return (
                            <TransactionType onValueChange={field.onChange} value={field.value} >
                                <TransactionTypeButton value='income' variant='income'>
                                    <ArrowCircleUp size={24} />
                                    Entrada
                                </TransactionTypeButton>

                                <TransactionTypeButton value='outcome' variant='outcome'>
                                    <ArrowCircleDown size={24} />
                                    Saída
                                </TransactionTypeButton>
                            </TransactionType>
                        )
                    }} />

                    <button type='submit' disabled={isSubmitting} >Cadastrar</button>
                </form>
            </Content>
        </Dialog.Portal>
    )
}