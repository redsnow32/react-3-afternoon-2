import React, { Component } from 'react';
import Hero from './subcomponents/Hero';
import BlogThumb from './subcomponents/BlogThumb';
import axios from 'axios';

// import axios

class Home extends Component{
    constructor(){
        super();
        this.state = {
            featured: '',
            index: 0,
            posts: [{title: "Loading...",image: 'https://unsplash.it/900/400/?random'}]
        }
    }

    componentWillMount () {
        axios.get('/api/featured').then((resp)=>{
            // console.log(resp)
            this.setState({
                featured:resp.data,
                index:(~~(Math.random() * resp.data.length) + 0),
                posts:resp.data
            })
        }).catch(console.log)
    }
   
    render(){
        const posts = this.state.posts.map( (item, index)=> 
         <BlogThumb key={index} blog={item}/>)
        

        return(
            <div className="content" >
                <Hero blog={this.state.posts[this.state.index]} />
                <hr/>
                <div className="blog-grid">
                    {/* put your mapped blogs here */}
                    {posts}
                </div>
            </div>
        )
    }
}

export default Home;