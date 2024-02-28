# Client Side Routing

### SWBATs:

- [ ] Observer how to memoize functions with useCallback and values with useMemo
- [ ] Observe how to set up a ProjectsProvider and leverage useConatext to create global state management 
- [ ] Observe how to keep track of values across re-renderings with useRef
- [ ] Observe how to handle nested client-side routes

## Deliverables

#### 1. Install and setup react router

- React Router has been updated to V6 but V5 is used in the curriculum.

- To install V5 run this command: `npm install react-router-dom@5.3.0` otherwise, V6 will install by default

#### 2. Use Switch and Route to set up initial routes so we can conditionally render components based on URL

- Start setting up your routes with createBrowserRouter, RouterProvider

- Use an <Outlet /> to share information with the children

- Start refactoring the app now that your information follows a different flow

#### 3. Add navigation to the application using the `Link` and `NavLink` components

- Convert any html anchor tags to `Link` or `NavLink`

- Demonstrate the difference between `Link` and `NavLink`

#### 4. Create a nested route for the project show page inside of the `ProjectList` component


