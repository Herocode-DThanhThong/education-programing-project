import { LoadingScreen } from "components/Loading";
import AdminCoursePage from "pages/adminCoursePage";
import AdminChapterPage from "pages/adminCoursePage/components/chapter";
import AddChapterPage from "pages/adminCoursePage/components/chapter/addChapter/AddChapter";
import EditChapterPage from "pages/adminCoursePage/components/chapter/editChapter/EditChapter";
import { default as ManagementCoursesPage } from "pages/adminCoursePage/components/courses";
import AddCoursePage from "pages/adminCoursePage/components/courses/addCourse/AddCourse";
import EditCourse from "pages/adminCoursePage/components/courses/editCourse/EditCourse";
import AdminDashboard from "pages/adminCoursePage/components/dashboard";
import AdminExericsePage from "pages/adminCoursePage/components/exercise";
import AddExercisePage from "pages/adminCoursePage/components/exercise/addExercise/AddExercisePage";
import EditExercisePage from "pages/adminCoursePage/components/exercise/editExercise/EditExercisePage";
import AdminLessonPage from "pages/adminCoursePage/components/lessons";
import AddLessonPage from "pages/adminCoursePage/components/lessons/addLesson/AddLesson";
import EditLessonPage from "pages/adminCoursePage/components/lessons/editLesson/EditLesson";
import AdminStudyPathPage from "pages/adminCoursePage/components/study-path";
import AddStudyPathPage from "pages/adminCoursePage/components/study-path/addStudyPath/AddStudyPath";
import EditStudyPathPage from "pages/adminCoursePage/components/study-path/editStudypath/EditStudyPath";
import { AdminUserPage } from "pages/adminCoursePage/components/users";
import CreateAccount from "pages/createAccount";
import DetailCoursePage from "pages/detailCoursePage";
import FriendCoursePage from "pages/friendCoursePage";
import Home from "pages/home";
import HomeCourse from "pages/homeCoursePage";
import LearnCoursePage from "pages/learnCoursePage";
import Login from "pages/login";
import MyCoursePage from "pages/myCoursePage";
import PageNotFound from "pages/notFound";
import PostDetail from "pages/postDetail";
import RoadMapCoursePage from "pages/roadmapCoursePage";
import { PrivateRoute, PublicRoute } from "pages/routes";
import SearchPost from "pages/searchPost";
import StudyCoursePage from "pages/studyCoursePage";
import UserPost from "pages/userPost";
import UserProfile from "pages/userProfile";
import React from "react";
import "react-quill/dist/quill.snow.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "swiper/css";
import "./App.css";
import { AdminRoute } from "pages/routes/AdminRoute";
import SearchCoursePagee from "pages/SearchCoursePage";
const App: React.FC = () => {
  return (
    <div className="App">
      <LoadingScreen />
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/community" element={<Home />} />
            <Route path="/community/post/:postId" element={<PostDetail />} />
            <Route path="/community/post/search" element={<SearchPost />} />
            <Route path="/community/userPost/:userId" element={<UserPost />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="" element={<HomeCourse />} />
            <Route path="/learn" element={<LearnCoursePage />} />
            <Route path="/search/course" element={<SearchCoursePagee />} />
            <Route path="/friends" element={<FriendCoursePage />} />
            <Route path="/course/:id" element={<DetailCoursePage />} />
            <Route
              path="/learning/course/:courseId"
              element={<StudyCoursePage />}
            />
            <Route path="/road-map" element={<RoadMapCoursePage />} />
            <Route path="/my-course" element={<MyCoursePage />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<CreateAccount />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminCoursePage />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="courses" element={<ManagementCoursesPage />} />
              <Route path="courses/add" element={<AddCoursePage />} />
              <Route path="courses/edit/:id" element={<EditCourse />} />
              <Route path="users" element={<AdminUserPage />} />
              <Route path="study-path" element={<AdminStudyPathPage />} />
              <Route path="study-path/add" element={<AddStudyPathPage />} />
              <Route
                path="study-path/edit/:id"
                element={<EditStudyPathPage />}
              />
              <Route path="chapter" element={<AdminChapterPage />} />
              <Route path="chapter/add" element={<AddChapterPage />} />
              <Route path="chapter/edit/:id" element={<EditChapterPage />} />
              <Route path="lesson" element={<AdminLessonPage />} />
              <Route path="lesson/add" element={<AddLessonPage />} />
              <Route path="lesson/edit/:id" element={<EditLessonPage />} />
              <Route path="exercise" element={<AdminExericsePage />} />
              <Route path="exercise/add" element={<AddExercisePage />} />
              <Route path="exercise/edit/:id" element={<EditExercisePage />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
