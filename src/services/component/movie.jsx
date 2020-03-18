import React, { Component } from 'react';
import { getMovies } from "../fakeMovieService";
import MoviesTable from "../component/moviesTable"
import Pagination from "./common/pagination";
import {paginate} from '../../utils/paginate';
import ListGroup from './common/listGroup';
import {getGenres} from '../fakeGenreService';
import _ from 'lodash';



class Movies extends Component {
    state = { 
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        sortColumn: {path: 'title', order: 'asc'}
     }
     
     
     componentDidMount(){
         const genres = [{_id: '', name: "All Genres"}, ...getGenres()]
         this.setState({movies : getMovies(), genres})
     }


     handleDelete = (movie) => {
         const movies = this.state.movies.filter(m => m._id !== movie._id);
           this.setState({movies})
     }
     restoreDelete = (wholeMoview) => {
         console.log(wholeMoview)
        this.setState({movies :wholeMoview})
     }

     handleLike = (movie) =>{
         const movies = [...this.state.movies];
         const index = movies.indexOf(movie)
         movies[index] = {...movies[index]}
         movies[index].liked = !movies[index].liked
         this.setState({movies})
     }
   
    handlePageChange = page => {
        this.setState({currentPage : page});
    };

    handleGenresSelect = genre =>{
        this.setState({selectedGenre: genre, currentPage: 1})
    }

    handleSort = sortColumn => {
        this.setState({sortColumn})
    }

    getPagedData = () => {
        const {
            currentPage, 
            pageSize, 
            movies: allMovies, 
            selectedGenre,
            sortColumn
        } 
            = this.state
       
       
    
            //filtering the data
                const filtered = selectedGenre && selectedGenre._id
                ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
            
            //sorting the data
            const sorted = _.orderBy(filtered, [sortColumn.path],[sortColumn.order])


            const movies = paginate(sorted, currentPage, pageSize);

            return {totalCount: filtered.length, data: movies}
    }
    

    render() { 
        const { length : count} = this.state.movies;

        if (count === 0)
        return <p>There are no movies in the data base</p>;
        // <button onClick = { () =>this.restoreDelete(getMovies()) }className = "btn btn-danger btn-sm">Restore</button>


        const {
            currentPage, 
            pageSize, 
            sortColumn
        } 
            = this.state
       
        const {totalCount, data: movies} = this.getPagedData();

        return  (   <div className = "row">

            <div className="col-3">
                <ListGroup 
                items = {this.state.genres} 
                onItemSelect = {this.handleGenresSelect}
                selectedItem = {this.state.selectedGenre}/>
            </div>



            <div className="col">
            <p>Showing {totalCount} movies in the database</p>

            <MoviesTable 
            movies = {movies} 
            sortColumn = {sortColumn}
            onLike = {this.handleLike} 
            onDelete = {this.handleDelete}
            onSort = {this.handleSort}/>

    <Pagination 
    itemsCount = {totalCount} 
    pageSize = {pageSize} 
    onPageChange = {this.handlePageChange} 
    currentPage = {currentPage}/>

            </div>
            
    </div>
        );
    }
}
 
export default Movies;