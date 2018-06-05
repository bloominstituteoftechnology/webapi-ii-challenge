import React, { Component } from 'react';

class AddContents extends Component {
    render() {
        return (
            <div className='form'>
                <input className='title-input'
                    type='text'
                    name='contents'
                    placeholder='title'
                    />
                <textarea className='text-input'
                    type='text'
                    name='title'
                    placeholder='contents'
                />
                <button className='add-button'>Add</button>
            </div>
        );
    }
}

export default AddContents;