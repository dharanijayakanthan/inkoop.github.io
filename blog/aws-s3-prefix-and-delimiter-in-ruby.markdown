---
layout: blog
title: A Way to list files and folders of a bucket of S3 using prefix and delimiter in Ruby | Inkoop
description: A Way to list files and folders of a bucket of S3 using prefix and delimiter in Ruby
---

# A Way to list files and folders of a bucket of S3 using prefix and delimiter in Ruby

Before we get started, it is important to know few things.

Amazon Simple Storage Service which is also known as Amazon S3 is highly scalable, secure object storage in the cloud. It is used to store and obtain any amount of data at any time and from anywhere on the web. Amazon S3 is mainly used for backup, faster retrieval and reduce in cost as the users have to only pay for the storage and the bandwith used.

Every data that is stored in s3 is considered as object and objects are stored in something called bucket. When you are uploading any file to s3, an object is being stored to the bucket in background.
You can set permission to bucket about who can access it, create it or delete the bucket.

The first step is to create the s3 object with proper credentials

```ruby
#aws_objects.rb 
s3 = Aws::S3::Resource.new({
  region: ENV['AWS_REGION'],
    access_key_id: ENV['AWS_ACCESS_KEY_ID'], 
    secret_access_key: ENV['AWS_SECRET_ACCESS_KEY']
  })
```
Assuming that the heirarchy is as below:

```
mycollection #bucket name

photos
  2017
    image1.jpg #photos/2017/image1.jpg
    image2.jpg #photos/2017/image2.jpg
  2016
    myphoto.jpg #photos/2016/myphoto.jpg
    image1.jpg  #photos/2016/image1.jpg
  2010
    image1.jpg #photos/2010/image1.jpg
photo
  2010
    image1.jpg #photo/2010/image1.jpg
  2016
    image1.jpg #photo/2016/image1.jpg
audio
  random.mp3 # audio/random.mp3
  2010
    one.mp3 #audio/2010/one.mp3
  2016
    two.mp3 #audio/2016/two.mp3
  jan
    2016
      two.mp3 #audio/jan/2016/two.mp3
      one.mp3 #audio/jan/2016/one.mp3
  feb
    2016
      three.mp3 #audio/feb/2016/three.mp3
random1.jpg 
random2.mp3
random3.jpg
2016_random.jpg
2016_random2.jpg
2016_random1.mp3
```

The arguments prefix and delimiter for the objects method is used for sorting the files and folders.
Prefix should be set with the value that you want the files or folders to begin with. And delimiter should be set if you want to ignore any file of the folder. You will understand what i mean if you follow the examples.

**Example 1:**

Suppose you want to list only the files in the bucket present then it should be,

```ruby
#aws_objects.rb 
...
puts s3.bucket("mycollection").objects(prefix:'', delimiter: '/').collect(&:key)

```
The output will be all the files present in the first level of bucket. As the prefix is set to nothing, any file which begins with anything will be considered. And delimiter is set to "/" which means only the files which has no "/" will be fetched and if there is any file which has a "/"" will be ignored. Hence, the output will be 

```
random1.jpg 
random2.mp3
random3.jpg
2016_random.jpg
2016_random2.jpg
2016_random1.mp3
```

**Example 2:**

Suppose you want to list all the files and folders in the bucket present then it should be,

```ruby
#aws_objects.rb 
...
puts s3.bucket("mycollection").objects(prefix:'', delimiter: '').collect(&:key)

```
The output will be all the files and folders present in the bucket. Both prefix and delimiter is set to nothing which means any file with any begining and no restriction on the path also. So,

```
2016_random.jpg
2016_random2.jpg
2016_random1.mp3
audio/
audio/2010/
audio/2010/one.mp3
audio/2016/
audio/2016/two.mp3
audio/feb/
audio/feb/2016/
audio/feb/2016/three.mp3
audio/jan/
audio/jan/2016/
audio/jan/2016/one.mp3
audio/jan/2016/two.mp3
audio/random.mp3
photo/
photo/2010/
photo/2010/image1.jpg
photo/2016/
photo/2016/image1.jpg
photos/
photos/2010/
photos/2010/image1.jpg
photos/2016/
photos/2016/image1.jpg
photos/2016/myphoto.jpg
photos/2017/
photos/2017/image1.jpg
photos/2017/image2.jpg
random1.jpg 
random2.mp3
random3.jpg

```

**Example 3:**

Suppose you want to list all the contents of the folder photos/2017/ in the bucket then it should be,

```ruby
#aws_objects.rb 
...
puts s3.bucket("mycollection").objects(prefix:'photos/2017/', delimiter: '').collect(&:key)

```
Then the output will be,

```
photos/2017/
photos/2017/image1.jpg
photos/2017/image2.jpg
```

In the folder photos/2017/, only two files will be sorted because the prefix is set to 
"photos/2017/" which means, display only those files and folders which begin with photos/2017/ and 
ignore rest.

**Example 4:**

Suppose you want to list all the files and folders of the folder audio/ in the bucket then,

```ruby
#aws_objects.rb 
...
puts s3.bucket("mycollection").objects(prefix:'audio/', delimiter: '').collect(&:key)

```
Then, 

```
audio/
audio/2010/
audio/2010/one.mp3
audio/2016/
audio/2016/two.mp3
audio/feb/
audio/feb/2016/
audio/feb/2016/three.mp3
audio/jan/
audio/jan/2016/
audio/jan/2016/one.mp3
audio/jan/2016/two.mp3
audio/random.mp3
```

**Example 5:**

```ruby
#aws_objects.rb 
...
puts s3.bucket("mycollection").objects(prefix:'audio/', delimiter: '/').collect(&:key)

```
At first, it sorts those files and folders which begin with audio/ out of all the files present in the bucket. The result of first sort is 

```
audio/
audio/2010/
audio/2010/one.mp3
audio/2016/
audio/2016/two.mp3
audio/feb/
audio/feb/2016/
audio/feb/2016/three.mp3
audio/jan/
audio/jan/2016/
audio/jan/2016/one.mp3
audio/jan/2016/two.mp3
audio/random.mp3
```

Next, Out of all the above files it sorts those files which do not have "/" after the prefix. There is only file and hence that is the result

```
audio/
audio/random.mp3
```

**Example 6:**

```ruby
#aws_objects.rb 
...
puts s3.bucket("mycollection").objects(prefix:'audio/jan/', delimiter: '/').collect(&:key)

```
First, sorting of files which begin with "audio/jan/" will be collected which gives the result as

```
audio/jan/
audio/jan/2016/
audio/jan/2016/one.mp3
audio/jan/2016/two.mp3
```

And now it starts looking if there is any file with no "/" after the prefix and then it concludes there is no file so it returns only the folder name

```
audio/jan/
```

I hope this blog helped you understand about how to use delimiter and prefix in ruby. Keep practicing!!!

**~ Ameena **
