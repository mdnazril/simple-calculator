import Calculator from "../components/Calculator"

type Props = {}

const Home = (props: Props) => {

    return (
        <div className='w-full h-full flex justify-center items-center'>
            <Calculator />
        </div>
    )
}

export default Home