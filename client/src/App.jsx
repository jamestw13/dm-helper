import { lazy } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import { QUERY_ME, UserContext } from "./features/users";
import { useQuery } from "@apollo/client";

import Auth from "./utils/auth";
const MainLayout = lazy(() => import("./components/MainLayout.jsx"));
const Home = lazy(() => import("./components/Home.jsx"));
const Profile = lazy(() => import("./features/users/components/Profile.jsx"));
const Campaign = lazy(() =>
  import("./features/campaigns/components/Campaign.jsx")
);
const Encounter = lazy(() =>
  import("./features/encounter/components/Encounter.jsx")
);
const Character = lazy(() =>
  import("./features/characters/components/Character.jsx")
);
const NoMatch = lazy(() => import("./components/NoMatch.jsx"));

const FriendList = lazy(() => import("./features/friends/FriendList.jsx"));

const loggedIn = Auth.loggedIn();
const App = () => {
  const { data: userData } = useQuery(QUERY_ME);

  return (
    <Router>
      <UserContext.Provider value={{ user: userData?.me || {}, loggedIn }}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route exact path="/" element={<Home />} />
            {loggedIn && (
              <>
                <Route exact path="/:userId" element={<Profile />} />
                <Route exact path="/sheet/:charId" element={<Character />} />

                <Route
                  exact
                  path="/campaign/:campaignId"
                  element={<Campaign />}
                />
                <Route
                  exact
                  path="/encounter/:encounterId"
                  element={<Encounter />}
                />

                <Route exact path="/friends/" element={<FriendList />} />
              </>
            )}
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
