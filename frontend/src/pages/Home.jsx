import NextLevel from "../components/nextLevel";
import Enroll from "../components/Enroll";
import WeOffer from "../components/WeOffer";
import TrendingCourses from "../components/TrendingCourses";
import OnlineExam from "../components/OnlineExam";
import TestAbility from "../components/TestAbility";
import Publication from "../components/Publication";
import Recent from "../components/Recent";
import NotableInstructors from "../components/NotableInstructors";
import ContactUs from "../components/ContactUs";

function Home() {
  return (
    <>
      <NextLevel />
      <Enroll />
      <WeOffer />
      <TrendingCourses columns={{ base: 1, md: 2, lg: 4 }}  />
      <OnlineExam />
      <TestAbility />
      <Publication />
      <Recent />
      {/* <NotableInstructors /> */}
      <ContactUs />
    </>
  );
}

export default Home;
