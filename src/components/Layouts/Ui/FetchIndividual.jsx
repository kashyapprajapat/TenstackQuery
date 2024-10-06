import { useQuery } from "@tanstack/react-query";
import { FetchIndividualPost } from "../../../API/api";
import { NavLink, useParams } from "react-router-dom";

const FetchIndividual = () => {

  const {id}  = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["quote",id], 
    queryFn: () => FetchIndividualPost(id), 
    });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching data.</p>;
  }

  return (
    <div style={{
      marginBottom: "20px",
      border: "1px solid #ccc",
      padding: "10px",
    }}>
      <ul className="section-accordian">
         <li>
          <p>ID: {data.id}</p>
          <p>{data.title}</p>
          <p>{data.body}</p>
         </li>
         <NavLink to="/rq">
         <button>Go Back</button>
         </NavLink>
      </ul>

    </div>
  )
}

export default FetchIndividual