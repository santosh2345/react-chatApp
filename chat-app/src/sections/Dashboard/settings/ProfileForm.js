// import React, { useCallback, useState } from "react";
// import FormProvider from "../../../components/hook-form/FormProvider";
// import * as Yup from "yup";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import {
//   Alert,
//   Button,
//   IconButton,
//   InputAdornment,
//   Link,
//   Stack,
//   useTheme,
// } from "@mui/material";
// import  RHFTextField  from "../../../components/hook-form/RHFTextField";
// import { Eye, EyeSlash } from "phosphor-react";
// import { Link as RouterLink } from "react-router-dom";

// const ProfileForm = () => {
//   const theme = useTheme();

//   const ProfileSchema = Yup.object().shape({
//     name: Yup.string().required("Name is Required"),
//     about: Yup.string().required("About is required"),
//     avatarUrl: Yup.string().required("Avatar is required").nullable(true),
//   });
//   const defaultValues = {
//     name: "",
//     about: "",
//   };

//   const methods = useForm({
//     resolver: yupResolver(ProfileSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     watch,
//     control,
//     setError,
//     setValue,
//     handleSubmit,
//     formState: { errors, isSubmitting, isSubmitSuccessful },
//   } = methods;

//   const values = watch();

//   const handleDrop = useCallback(
//     (acceptedFiles) => {
//       const file = acceptedFiles[0];
//       const newFile = Object.assign(file, {
//         preview: URL.createObjectURL(file),
//       });
//       if (file) {
//         setValue("avatarUrl", newFile, { shouldValidate: true });
//       }
//     },
//     [setValue]
//   );

//   const onSubmit = async (data) => {
//     try {
//       //submit    data to backend
//       console.log("Data ", data);
//     } catch (error) {
//       console.log(error);
//       reset();
//       setError("afterSubmit", {
//         ...error,
//         message: error.message,
//       });
//     }
//   };
//   return (
//     <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
//         <Stack spacing={3}>

       
//       <Stack spacing={3}>
//         {!!errors.afterSubmit && (
//           <Alert severity="error">{errors.afterSubmit.message}</Alert>
//         )}

//         <RHFTextField
//           name="name"
//           label="Name"
//           helperText={"This name is visible to your contacts"}
//         />
//         <RHFTextField
//           multiline
//           rows={3}
//           maxRows={5}
//           name="about"
//           label="About"
//         />
//       </Stack>
//       <Stack direction={"row"} justifyContent="end">
//         <Button color="primary" type="submit" size="large" variant="outlined">
//           Save
//         </Button>
//       </Stack>
//       </Stack>
      
//     </FormProvider>
//   );
// };

// export default ProfileForm;


import React, { useCallback, useState } from "react";
import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../../components/hook-form/FormProvider";
import  RHFUploadAvatar  from "../../../components/hook-form";
import RHFTextField from "../../../components/hook-form";
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserProfile } from "../../../redux/slices/app";
import { AWS_S3_REGION, S3_BUCKET_NAME } from "../../../config";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const { user } = useSelector((state) => state.app);

  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required("Name is required"),
    about: Yup.string().required("About is required"),
    avatar: Yup.string().required("Avatar is required").nullable(true),
  });

  const defaultValues = {
    firstName: user?.firstName,
    about: user?.about,
    avatar: `https://${S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${user?.avatar}`,
  };

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    try {
      //   Send API request
      console.log("DATA", data);
      dispatch(
        UpdateUserProfile({
          firstName: data.firstName,
          about: data.about,
          avatar: file,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      setFile(file);

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("avatar", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <RHFUploadAvatar name="avatar" maxSize={3145728} onDrop={handleDrop} />

        <RHFTextField
          helperText={"This name is visible to your contacts"}
          name="firstName"
          label="First Name"
        />
        <RHFTextField multiline rows={4} name="about" label="About" />

        <Stack direction={"row"} justifyContent="end">
          <LoadingButton
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            // loading={isSubmitSuccessful || isSubmitting}
          >
            Save
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;