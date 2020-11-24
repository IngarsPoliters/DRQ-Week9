import React from 'react';
import axios from 'axios';

export class Create extends React.Component {

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
                poster:this.state.poster
            };

        axios.post('http://localhost:4000/api/movies', newMovie)
        .then(response => console.log(response.data))
        .catch(error => console.log(error));    

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
                            value='Add Movie'
                            className='btn btn-primary'></input>
                    </div>
                </form>
            </div>
        );
    }
}