import React, { Fragment, useState } from 'react'
import axios from 'axios';
import qs from 'qs'
import { Redirect } from 'react-router-dom';


const Comments = ({ currentUser, camp, id, getcamp }) => {

    const [formin, setformin] = useState({ review: { rating: 5, comment: '' } });

    function handleChange(e) {
        const { name, value } = e.target;
        setformin({ review: { ...formin.review, [name]: value } });
    }

    function handleSubmit(e) {
        e.preventDefault();
        async function fetchMyApi() {

            const res = await axios({
                method: 'post',
                url: `/campground/${id}/review`,
                data: qs.stringify(formin),
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
            })
            console.log(res.data)

            const newcamp = await axios.get(`/campground/${id}`)
            getcamp(newcamp.data)
        }
        fetchMyApi();

    }

    function handleClick(e) {
        const { name } = e.target
        async function fetchMyApi() {

            const res = await axios({
                method: 'delete',
                url: `/campground/${id}/review/${name}`
            })
            console.log(res.data)
            const newcamp = await axios.get(`/campground/${id}`)
            getcamp(newcamp.data)
        }
        fetchMyApi();
    }
    // /campground/<%=camp._id %>/review/<%=review._id

    return (
        <Fragment>
            {/* <div id='map' className="mb-3" style='width: 100%; height: 300px;'></div> */}

            {currentUser && <div id='review' className="card">
                <h5 className="card-header">Leave a Comment!</h5>
                <div className="card-body pt-0">
                    <form onSubmit={handleSubmit} className="needs-validation"
                        noValidate>
                        <div className="d-flex d-inline">
                            <div className="d-flex align-items-center">
                                <h5 className="fs-4 me-2 mb-0">Star Rating</h5>

                            </div>
                            <fieldset className="starability-basic">

                                <input onChange={handleChange} type="radio" id="first-rate1" name="rating" value="1" />
                                <label htmlFor="first-rate1" title="Terrible">1 star</label>
                                <input onChange={handleChange} type="radio" id="first-rate2" name="rating" value="2" />
                                <label htmlFor="first-rate2" title="Not good">2 stars</label>
                                <input onChange={handleChange} type="radio" id="first-rate3" name="rating" value="3" />
                                <label htmlFor="first-rate3" title="Average">3 stars</label>
                                <input onChange={handleChange} type="radio" id="first-rate4" name="rating" value="4" />
                                <label htmlFor="first-rate4" title="Very good">4 stars</label>
                                <input onChange={handleChange} type="radio" id="first-rate5" name="rating" value="5" />
                                <label htmlFor="first-rate5" title="Amazing">5 stars</label>
                            </fieldset>
                        </div>


                        <div>
                            <textarea onChange={handleChange} className="form-control" name="comment" cols="30" rows="3" value={formin.review.comment}
                                required></textarea>

                            <div className="invalid-feedback">
                                Please enter your comments.
                        </div>
                        </div>
                        <button className="btn btn-success mt-3">Leave comment</button>
                    </form>
                </div>
            </div>}

            {/* <% } %> */}
            {/* <%for(let review of camp.reviews){%> */}
            {camp.reviews.map((review) => (
                <div key={review._id} className="border-bottom">
                    <div className="card-body">

                        <h5 className="card-title">
                            <small className="text-muted">
                                / {review.author.username}
                            </small>
                        </h5>

                        <p className="starability-result" data-rating={review.rating}>
                            Rated: {review.rating}stars
                        </p>
                        <p className="card-text">
                            <b>Comment:</b>
                            {review.comment}
                        </p>
                        {/* <% if(currentUser && review.author.equals(currentUser._id)){ %> */}
                        {currentUser && review.author._id === currentUser._id &&
                            <button onClick={handleClick} name={review._id} className="btn btn-sm btn-danger">Delete</button>

                        }

                        {/* <% } %> */}
                    </div>
                </div>
            ))}


        </Fragment>
    )
}

export default Comments
