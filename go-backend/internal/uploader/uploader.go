package uploader

import (
	"bytes"
	"fmt"
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

func UploadToS3(fileData []byte, fileName string, contentType string) (string, error) {

	awsRegion := os.Getenv("AWS_REGION")
	s3Bucket := os.Getenv("S3_BUCKET")
	cloudfrontURL := os.Getenv("CLOUDFRONT_URL")

	s, err := session.NewSession(&aws.Config{
		Region: aws.String(awsRegion)},
	)
	if err != nil {
		return "", err
	}

	uploadInput := &s3.PutObjectInput{
		Bucket:      aws.String(s3Bucket),
		Key:         aws.String(fileName),
		Body:        bytes.NewReader(fileData),
		ContentType: aws.String(contentType),
	}

	_, err = s3.New(s).PutObject(uploadInput)
	if err != nil {
		return "", err
	}

	finalURL := fmt.Sprintf("%s/%s", cloudfrontURL, fileName)
	return finalURL, nil
}
