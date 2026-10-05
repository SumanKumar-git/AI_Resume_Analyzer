import { useAuth } from '../hooks/useAuth'
import Loader from './Loader';
import { Navigate } from 'react-router';

const Protected = ({children}) => {

    const { loading, user } = useAuth();

    if(loading){
        return (<main><Loader/></main>)
    }
    if(!user){
        return <Navigate to={"/login"}/>
    }

    return children
}

export default Protected