import React from 'react'

const Flash = ({ success, error }) => {
    return (
        <div>
            {success && success.length && <div class="alert alert-success alert-dismissible fade show" role="alert">
                {success}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}

            {error && error.length && <div class="alert alert-danger alert-dismissible fade show" role="alert">
                {error}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}

        </div>
    )
}

export default Flash
