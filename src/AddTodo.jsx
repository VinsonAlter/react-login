import {useState} from 'react'

export default function AddTodo({className, onAddTodo}) {
    const [text, setText] = useState('')

    return (
        <>
            {/* <form> */}
                <input value={text} onChange={e => setText(e.target.value)}/>
                <button className={className}
                    onClick={() =>  {
                        onAddTodo(text)
                        setText('')
                    }}
                >Submit</button>
            {/* </form> */}
            
        </>
    )
}