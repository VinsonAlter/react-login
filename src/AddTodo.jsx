import {useState} from 'react'

export default function AddTodo({onAddTodo}) {
    const [text, setText] = useState('')

    return (
        <>
            {/* <form> */}
                <input value={text} onChange={e => setText(e.target.value)}/>
                <button
                    onClick={() =>  {
                        onAddTodo(text)
                        setText('')
                    }}
                >Submit</button>
            {/* </form> */}
            
        </>
    )
}