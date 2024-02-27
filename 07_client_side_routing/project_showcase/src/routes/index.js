import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import ProjectContainer from '../components/project/ProjectContainer'
import ProjectForm from '../components/project/ProjectForm'
import ProjectDetails from '../components/project/ProductDetails'
import Error from '../components/errors/Error'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: "projects",
                element: <ProjectContainer />
            },
            {
                path: "projects/new",
                element: <ProjectForm />
            },
            {
                path: "projects/:projectId/edit",
                element: <ProjectForm />
            },
            {
                path: "projects/:projectId",
                element: <ProjectDetails />
            },
        ]
    }
])