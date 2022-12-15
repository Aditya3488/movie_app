import React, { Component } from "react";
// import { movies } from "./getMovies";
import axios from "axios";

export default class MovieList extends Component {
    constructor(){
        super();
        this.state={
            hover:'',
            parr:[1],
            currPage:1,
            movies:[],
            favourites:[]
        }   
    }
    async componentDidMount(){
        // sideEffects
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
        let data = res.data
        // console.log(data)
        this.setState({
            movies:[...data.results]
        })
    }
    changeMovie = async()=>{
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
        let data = res.data
        // console.log(data)
        this.setState({
            movies:[...data.results]
        })
    }
    handleRight=()=>{
        let temparr = []
        for(let i=1;i<=this.state.parr.length+1;i++){
            temparr.push(i)
        }
        this.setState({
            parr:[...temparr],
            currPage:this.state.currPage+1
        },this.changeMovie)
        
    }
    handleLeft=()=>{
        if(this.state.currPage!==1){
            this.setState({
                currPage:this.state.currPage-1
            },this.changeMovie)
        }
    }
    handleClick=(value)=>{
        if(value!==this.state.currPage){
            this.setState({
                currPage:value
            },this.changeMovie)
        }
    }
    handleFavourites=(movie)=>{
        let oldData = JSON.parse(localStorage.getItem('movies') || '[]')
        if(this.state.favourites.includes(movie.id)){
            oldData = oldData.filter((m)=>m.id!=movie.id)
        }else{
            oldData.push(movie)
        }
        localStorage.setItem('movies',JSON.stringify(oldData))
        console.log(oldData)
        this.handleFavouritesState()
    }
    handleFavouritesState=()=>{
        let oldData = JSON.parse(localStorage.getItem('movies') || '[]')
        let temp = oldData.map((movie)=>movie.id);
        this.setState({
            favourites:[...temp]
        })
    }
  render() {
    return (
      <>
        {this.state.movies.length === 0 ? 
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
         : 
          <div>
            <h1 className="text-center">
              <strong>Tranding</strong>
            </h1>
            <div className="movies-list">
              {
             this.state.movies.map((movieObj) => (
                <div className="card movie-card"   onMouseEnter={()=>{
                    this.setState({hover:movieObj.id})
                }}
                onMouseLeave={()=>{
                    this.setState({hover:''})
                }}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                    className="card-img-top movie-img"
                    alt={movieObj.title}
                  
                  />
                  {/* <div className="card-body"> */}
                  <h5 className="card-title movie-title">
                    {movieObj.original_title}
                  </h5>
                  {/* <p className="card-text movie-text">{movieObj.overview}</p> */}
                  <div
                    className="button-wrapper"
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    {
                        this.state.hover === movieObj.id && 
                        <button  className="btn btn-primary movie-button" onClick={()=>this.handleFavourites(movieObj)}>
                      {this.state.favourites.includes(movieObj.id)?'Remove from farvourites':"Add to favourites"}
                    </button>
                    }
                    
                  </div>
                  {/* </div> */}
                </div>
              ))}
            </div>
            <div style={{display:'flex', justifyContent:"center"}} >
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" onClick={this.handleLeft}>Previous</a></li>
                    {
                        this.state.parr.map((value)=>(
                            <li className="page-item"><a className="page-link" onClick={()=>this.handleClick(value)} >{value}</a></li>
                        ))
                    }
                    <li className="page-item"><a className="page-link" onClick={this.handleRight}>Next</a></li>
                </ul>
            </nav>
            </div>
          </div>
        }
      </>
    );
  }
}
