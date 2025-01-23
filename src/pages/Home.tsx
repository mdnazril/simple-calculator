import Calculator from "../components/Calculator"


type Props = {}

const Home = (props: Props) => {

    return (
        <div className='flex justify-center items-center w-full h-full gap-3'>
            <Calculator />
        </div>
    )
}

export default Home