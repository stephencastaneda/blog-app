import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import {createHome} from "../../pages/index";



describe("The Home Page Component", () => {
  const config = {
    title: "Stephen Castaneda | Blog",
    name: "Stephen Castaneda",
    github: "stephencastaneda",
    twitter: "twitter",
  };

  // Each test for the component will get an `it` block
  it("should render all fetched posts", async () => {
    // The getByRole will error if there are less or more than 1 element found
    function mockFetchPosts() {
      return Promise.resolve([
        {
          id: 1, 
          date: "2022-02-25", 
          title: "Blog Test",
          author: "Blog Author",
          text: "Hey, hope this test passed!",
        }
      ])
    }
    const Home = createHome(mockFetchPosts)
    render(
      <Home
        config={config}
      />
    );
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i))
    const posts = screen.getAllByTestId("post");
    expect(posts).toHaveLength(1);
  });

    // Each test for the component will get an `it` block
    // it("should catch error", async () => {
    //   // The getByRole will error if there are less or more than 1 element found
    //   function mockError() {
    //     return Promise.reject([
    //       {
    //         id: 1, 
    //         date: "2022-02-25", 
    //         title: "Blog Test",
    //         author: "Blog Author",
    //         text: "Hey, hope this test passed!",
    //       }
    //     ])
    //   }
    //   const Home = createHome(mockError)
    //   render(
    //     <Home
    //       config={config}
    //     />
    //   );
    //   await waitForElementToBeRemoved(() => screen.getByText(/loading/i))
    //   const posts = screen.getAllByTestId("post");
    //   expect(posts).toHaveLength(1);
    // });
});
