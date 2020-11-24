import React from 'react';
import axios from 'axios';

export class Edit extends React.Component {

    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangePoster = this.onChangePoster.bind(this);

        this.state = {
            title: '',
            year: '',
            poster: ''
        }
    }
    
    //lifecycle hook 
    componentDidMount(){
        // when it becomes active in the view, the movie id is being logged to console
        console.log(this.props.match.params.id);
        // getting the id of the db document, to find a particular document
        //by its id, which gets passed as apart of the url
        //returns the document, and update the state below with the db document
        axios.get('http://localhost:4000/api/movies/'+this.props.match.params.id)
        .then(response =>{
            this.setState({
                _id:response.data._id,
                title:response.data.title,
                year:response.data.year,
                poster:response.data.poster
            })
        })
        .catch((error) =>{
            console.log(error);
        })
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeYear(e) {
        this.setState({
            year: e.target.value
        });
    }
    onChangePoster(e) {
        this.setState({
            poster: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        alert("Movie: " + this.state.title + " "
            + this.state.year + " " +
            this.state.poster);

            const newMovie ={
                title:this.state.title,
                year:this.state.year,
                poster:this.state.poster,
                _id:this.state._id
            };

            // 
            axios.put('http://localhost:4000/api/movies/'+ this.state._id,newMovie)
            .then(res =>{
                console.log(res.data)
            })
            .catch();

        //axios.post('http://localhost:4000/api/movies', newMovie)
        //.then(response => console.log(response.data))
        //.catch(error => console.log(error));    

    }

    render() {
        return (
            <div className='App'>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add Movie Title: </label>
                        <input type='text'
                            className='form-control'
                            value={this.state.title}
                            onChange={this.onChangeTitle}></input>
                    </div>
                    <div className="form-group">
                        <label>Add Movie Year: </label>
                        <input type='text'
                            className='form-control'
                            value={this.state.year}
                            onChange={this.onChangeYear}></input>
                    </div>
                    <div className='form-group'>
                        <label>Movies Poster: </label>
                        <textarea type='text'
                            className='form-control'
                            value={this.state.poster}
                            onChange={this.onChangePoster}>
                        </textarea>
                    </div>


                    <div className="form-group">
                        <input type='submit'
                            value='Edit Movie'
                            className='btn btn-primary'></input>
                    </div>
                </form>
            </div>
        );
    }
}