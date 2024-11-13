import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Paper from '@mui/material/Paper'
import { routes } from './routes';

const Router = () => {
  return (

    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element: Element }) => (
          <Route
            key={path}
            path={path}
            element={<Element />}
          />
        ))}
        <Route path="*" element={<Paper >not found </Paper >} />
      </Routes>
    </BrowserRouter>

  );
}

export default Router;