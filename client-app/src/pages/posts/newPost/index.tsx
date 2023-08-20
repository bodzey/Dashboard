import React, { ChangeEvent, FormEvent, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik, Field, Form } from "formik";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import { AddPostsSchema } from "./auth/PostValidation";
import { Navigate } from "react-router-dom";
import {
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import FormikControl from "./FormikControl";
import { PhotoCamera } from "@mui/icons-material";

const initialValues: any = {
  Title: "",
  ShortDescription: "",
  Description: "",
  CategoryId: "",
  Image: "",
};

interface FormValues {
  Title: string;
  ShortDescription: string;
  Description: string;
  CategoryId: string;
  Image: string;
}

const AddNewPost: any = () => {
  const { categories } = useTypedSelector((store) => store.CategoryReducer);
  const store = useTypedSelector((store) => store.PostReducer);
  const { loading } = store;
  const [isRedirect, SetIsRedirect] = useState(false);
  const [image, SetImage] = useState(
    "http://localhost:5000/images/noImage.jpg"
  );
  const { GetAllCategories, AddNewPosts } = useActions();

  React.useEffect(() => {
    GetAllCategories();
  }, []);

  const handleSubmit = async (values: FormValues) => {
    const newArticle = {
      Title: values.Title,
      ShortDescription: values.ShortDescription,
      Description: values.Description,
      CategoryId: values.CategoryId,
      Image: image,
    };

    AddNewPosts(newArticle);

    SetIsRedirect(true);
  };

  const getImage = async (e: any) => {
    const img = e.target.files ? e.target.files[0] : null;

    if (img !== null) {
      const convertedImage: any = await convertToBase64(img);
      SetImage(convertedImage);
    } else {
      const convertedImage: any = "undefined";
      SetImage(convertedImage);
    }
  };

  const convertToBase64 = (image: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(image);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  if (isRedirect) {
    return <Navigate to={"/dashboard/articles"} />;
  }

  return (
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Add new Post
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={AddPostsSchema}
          validateOnBlur={false}
        >
          {({ errors, touched, isValid, handleChange }) => (
            <Box
              style={{ width: "100%" }}
              component={Form}
              sx={{
                mt: 1,
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                label="Title"
                name="Title"
                style={{ magrinBottom: "20px" }}
                //  variant="standard"
              />
              {errors.Title && touched.Title ? (
                <div style={{ color: "red" }}>{errors.Title}</div>
              ) : null}
              <div style={{ display: "flex", gap: "24px" }}>
                <div style={{ textAlign: "center" }}>
                  <InputLabel />
                  <FormikControl
                    label="Short Description"
                    name="ShortDescription"
                    control="tiny-mce"
                  />
                  {errors.ShortDescription && touched.ShortDescription ? (
                    <div style={{ color: "red" }}>
                      {errors.ShortDescription}
                    </div>
                  ) : null}
                </div>
                <div style={{ textAlign: "center" }}>
                  <InputLabel />
                  <FormikControl
                    label="Full Description"
                    name="Description"
                    control="tiny-mce"
                  />
                  {errors.Description && touched.Description ? (
                    <div style={{ color: "red" }}>{errors.Description}</div>
                  ) : null}
                </div>
              </div>
              <div
                style={{
                  marginTop: "20px",
                  marginBottom: "40px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Button
                  variant="contained"
                  component="label"
                  sx={{ px: 5, py: 2 }}
                >
                  Upload
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={getImage}
                  />
                  <PhotoCamera sx={{ ml: 2 }} />
                </Button>

                <CardMedia
                  sx={{
                    width: "100%",
                    height: "250px",
                    backgroundSize: "contain",
                    mt: 3,
                  }}
                  image={image}
                ></CardMedia>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel
                    id="demo-simple-select-standard-label"
                    sx={{ pl: 3 }}
                  >
                    Category
                  </InputLabel>
                  <Select
                    name="CategoryId"
                    onChange={handleChange}
                    label="Category"
                    defaultValue={"Choose category"}
                    variant="outlined"
                  >
                    {categories.map((item: any) => {
                      return (
                        <MenuItem id={item.id} value={item.id}>
                          {item.Name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <div style={{ width: "100%", display: "flex" }}>
                <Button
                  disabled={!isValid}
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, px: 7, py: 2, margin: "0 auto" }}
                >
                  {loading ? "Add" : "Loading..."}
                </Button>
              </div>
            </Box>
          )}
        </Formik>
      </Box>
    </Container>
  );
};
export default AddNewPost;
