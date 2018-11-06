

//== List ======================================================================

//-- Dependencies --------------------------------
import React from 'react';
import Loading from './loading.js';
import './list.css';
import axios from 'axios';


//== Component =================================================================

export default class List extends React.Component {

    //-- Lifecycle -----------------------------------
    constructor() {
        super(...arguments);
        this.state = {
            items: []   ,
            ready: false,
        };
    }
    componentDidMount() {
        console.log('Trying')
        axios.get('http://localhost:8081/api/posts')
        .then(response => {
            let data = response.data;
            console.log(data);
            this.setState({
                items: data,
                ready: true,
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    //-- Rendering -----------------------------------
    render() {
        let loadNotifier;
        let classText = 'list';
        if(!this.state.ready){
            loadNotifier = (<Loading />);
            classText += ' list_loading';
        }
        return (
            <div className={classText}>
                <h1>Users Entries:</h1>
                {loadNotifier || this.state.items.map(item => (
                    <ListItem
                        key={item.id}
                        item={item}
                    />
                ))}
            </div>
        );
    }

    //-- Interaction ---------------------------------
}


//== Display Components ========================================================

function ListItem({item}) {
    return (
        <div className="list-item">
            <NameValuePair name="Title:" value={item.title} />
            <NameValuePair name="Contents:" value={item.contents} />
            <NameValuePair name="Created:" value={item.created_at} />
            <NameValuePair name="Updated:" value={item.updated_at} />
        </div>
    )
}
function NameValuePair(props) {
    return (
        <div className="list-item_pair">
            <span
                className="list-item_name"
                children={props.name}
            />
            <span
                className="list-item_value"
                children={` ${props.value}`}
            />
        </div>
    );
}
