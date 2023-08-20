import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../../../components/loader";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { Container } from "@mui/system";

const GetAllPosts: React.FC = () => {
  const { isAuth, user } = useTypedSelector((store) => store.UserReducer);

  const { GetAllPosts } = useActions();
  const { posts, loading } = useTypedSelector((store) => store.PostReducer);

  useEffect(() => {
    GetAllPosts();
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    const rows = posts?.map((post: any) => {
      const imgPath = "http://localhost:5000/images/" + post.Image;
      return (
        <Box
          key={post.id}
          sx={{
            flexGrow: 1,
            textAlign: "center",
          }}
        >
          <Card
            sx={{
              width: 250,
              display: "grid",
              margin: "0 auto",
              height: "100%",
            }}
          >
            <CardMedia
              sx={{ height: 200 }}
              image={imgPath}
              title={post.Title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {post.Title}
              </Typography>
              <Typography
                dangerouslySetInnerHTML={{ __html: post.ShortDescription }}
                variant="body2"
                color="text.secondary"
              ></Typography>
            </CardContent>
            {isAuth && (
              <>
                {user.Role == "Administrator" && (
                  <CardActions
                    sx={{
                      alignSelf: "flex-end",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button size="small">Read More</Button>

                    <Link
                      style={{ textDecoration: "none" }}
                      to="/dashboard/editPost"
                    >
                      <Button size="small">Edit Post</Button>
                    </Link>
                  </CardActions>
                )}

                {user.Role !== "Administrator" && (
                  <CardActions
                    sx={{
                      alignSelf: "flex-end",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button size="small">Read More</Button>
                  </CardActions>
                )}
              </>
            )}
          </Card>
        </Box>
      );
    });

    return (
      <>
        <Grid
          item
          xs={12}
          sx={{
            mb: 2,
            textAlign: "right",
            position: "fixed",
            bottom: "30px",
            right: "40px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              boxShadow: "0px 0px 50px 20px rgba(0, 0, 0, 0.6)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              textShadow:
                "-1px 0 rgba(0, 0, 0, 0.5), 0 1px rgba(0, 0, 0, 0.5), 1px 0 rgba(0, 0, 0, 0.5), 0 -1px rgba(0, 0, 0, 0.5)",
              borderRadius: "8px",
            }}
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/dashboard/newPost"
            >
              Add new post
            </Link>
          </Button>
        </Grid>
        <Container sx={{ display: "flex", flexWrap: "wrap", gap: "40px" }}>
          {rows}
        </Container>
      </>
    );
  }
};
export default GetAllPosts;
