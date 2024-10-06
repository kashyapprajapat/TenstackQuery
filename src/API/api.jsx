import axios from "axios";


const api =axios.create({
    baseURL:"https://jsonplaceholder.typicode.com/posts"
})

const getQuotes= (pageNumber) =>{
  const limit = 10;  // Number of items per page
  const start = pageNumber * limit;  // Calculate the start index based on the page number
  return api.get(`?_start=${start}&_limit=${limit}`);
}

// to fetch individual data
const FetchIndividualPost = async (id) =>{
     try {
        const res  = await api.get(`/${id}`);
        return res.status === 200 ? res.data : [];
     } catch (error) {
        console.log(error);
     }
}

export { getQuotes , FetchIndividualPost}