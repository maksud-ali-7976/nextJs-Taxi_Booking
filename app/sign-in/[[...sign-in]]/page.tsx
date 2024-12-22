import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className='flex  items-center justify-center my-3 py-10'>
            <SignIn />
        </div>
    )
}