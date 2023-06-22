import { GetStaticProps } from 'next'

import { Module, Book } from '@/components'
import { BookModel } from '@/models'
import { AxiosResponse, axiosServer } from '@/utils'

Home.title = 'Home'

type HomeProps = {
  books: BookModel[]
}

export default function Home({ books }: HomeProps) {
  return (
    <>
      <Module title='Sách Mới'>
        {books &&
          books.map((book: BookModel) => (
            <Book
              key={book.id}
              imageURL='/images/sach/11_6_2.jpg'
              name={book.name}
              author={book.author}
              price={book.price}
              salePrice={book.salePrice}
            />
          ))}
      </Module>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response: AxiosResponse = await axiosServer.get('/api/books/new')
    return {
      props: {
        books: response.data,
      },
    }
  } catch (error) {
    return {
      notFound: true,
      revalidate: 10,
    }
  }
}
