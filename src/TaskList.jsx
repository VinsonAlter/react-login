import {useState} from 'react'

export default function TaskList({list, toggleTodo, handleChange, deleteList}) {
    return (
        <li>
            <Task
                list={list}
                toggleTodo={toggleTodo}
                handleChange={handleChange}
                onDelete={deleteList}
            />
            {/* <input type="checkbox" checked={list.completed} value={list.id}
                onChange={() => onChange(list.id)}></input>
                <label>{list.title}</label>
                <button onClick={() => onDelete(list.id)}>Delete</button> */}
        </li>   
    )
}

function Task({list, toggleTodo, handleChange, onDelete}) {
    const [isEditing, setIsEditing] = useState(false)
    const [text, setText] = useState(list.title)
    let content;
    let completeList;
    
    if (isEditing) {
        content = (
            <>
                <input value={text} 
                    onChange={e => setText(e.target.value)
                        // handleChange({
                        //     ...list,
                        //     title: e.target.value
                        // })    
                    }></input>
                <button onClick={() => {
                    handleChange({
                        ...list,
                        title: text
                    })
                    setIsEditing(!isEditing)
                }}>Save</button>
            </>
        )
    } else {
        if(list.completed) {
            completeList = (
                <>
                    <label style={{textDecoration: "line-through"}}>{list.title}</label>
                </>
            ) 
        } else {
            completeList = (
                <>
                    <label>{list.title}</label>
                </>
            ) 
        }
        content = (
            <>
                {completeList}
                <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
            </>
        )
    }
    return (
        <>
            <input type="checkbox" checked={list.completed} value={list.id}
                onChange={() => toggleTodo({
                    ...list,
                    completed: !list.completed
                })}>
            </input>
            {content}
            <button onClick={() => onDelete(list.id)}>Delete</button>
        </>
        
    )

    // return (
    //     <>
    //        <input type="checkbox" 
    //             checked={completed}
    //             onChange={() => handleChange({
    //                 ...list,
    //                 completed: !list.completed
    //             })}
    //        />
    //        <label>{list.title}</label>
    //        <button onClick={() => onDelete(list.id)}>Delete</button>
    //     </>
    // )
}