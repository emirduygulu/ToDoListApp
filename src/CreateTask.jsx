import React, { useState } from 'react'

export default function CreateTask(props) {
    const [task, setTask] = useState({
        title: '',
        content: '',
    })

    function detectChange(event) {
        const {name, value} = event.target;
        setTask((prevTask) => {
            return {
                ...prevTask,
                [name]: value,
            };
        });
    }

    function submit(event) {
        event.preventDefault();
        if (task.title.trim() && task.content.trim()) {
            props.onAdd(task);
            setTask({
                title: '',
                content: '',
            });
        }
    }

    return (
        <form onSubmit={submit}>
            <div className='mb-3'>
                <input 
                    type="text"
                    className='form-control form-control-lg'
                    name='title'
                    value={task.title}
                    onChange={detectChange}
                    placeholder='Görev Başlığı'
                />
            </div>
            <div className='mb-3'>
                <textarea 
                    name='content'
                    className='form-control'
                    rows={3}
                    value={task.content}
                    onChange={detectChange}
                    placeholder='Yapılacak görevi detaylı açıklayınız...'
                ></textarea>
            </div>
            <button 
                type="submit" 
                className='btn btn-primary w-100'
            >
                <i className="bi bi-plus-circle me-2"></i>
                Görevi Ekle
            </button>
        </form>
    );
}
