

export default function Registration(){

    function handleSubmit(){

    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                Name: <input type="text" />
                Password:<input type="password" />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}