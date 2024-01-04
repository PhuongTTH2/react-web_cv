import AWS from "aws-sdk";
import mime from "mime";
import moment from "moment";

const s3 = new AWS.S3({
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
});

export const uploadFile = async (Test_id, file) => {
  const content_type = file.type;
  const subfolder = `posts/${Test_id}`;
  // const key = `${subfolder}/${Test_id}-${moment().unix()}.extension`;

  const key = `${subfolder}/${Test_id}-${moment().unix()}.${mime.getExtension(
    content_type
  )}`;
  const params = {
    Body: file,
    Bucket: process.env.REACT_APP_NRM,
    Key: key,
    ContentType: content_type,
    ACL: "public-read",
  };

  const res = await s3.upload(params).promise();
  return res;
};

export const deleteFile = async (file) => {
  const params = {
    Bucket: process.env.REACT_APP_NRM,
    Key: file.key,
  };
  try {
    await s3.deleteObject(params).promise();
  } catch (e) {}
};

export const deleteFileUser = async (file) => {
  const params = {
    Bucket: process.env.REACT_APP_NRM,
    Key: file,
  };
  try {
    await s3.deleteObject(params).promise();
  } catch (e) {}
};
