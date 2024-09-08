
- https://reactrouter.com/en/main/start/overview
- import createBrowserRouter từ react-router-dom

```
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <div>404 Page not found <button>Click not found</button></div>
    },
    {
        path: 'profiles',
        element: <Profile />,
        children: [
            {
                path: "/profiles/:profileId",
                element: <ProfilePage />
            }

        ]
    },
           // {
           //     path: "/profiles/:profileId",
           //     element: <ProfilePage />
           // }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterBrowserRouter router={router} />
    </React.StrictMode>
)


// sử dụng Link

- import { NavLink, Link } from "react-router-dom";

- <Link to="/"> Home from link </Link>  // ko reload page.

// NavLink cho phép check active link.
- <NavLink to="/" className={({isActive}) => {
    return isActive ? "text-primary-700" : ""
}} >

</NavLink>

// get params

import {useParams} from "react-router-dom";

const params = useParams<{profileId: string}>(); // {profileId: value}


// children roots

import {Outlet} from "react-router-dom";

<div>
    ...
    <Outlet />
</div>



```