import { EntryFieldTypes } from "contentful";

type Author = {
  name: string;
  image: string;
  designation: string;
};

export type Blog = {
  id: number;
  title: string;
  paragraph: string;
  image: string;
  author: Author;
  tags: string[];
  publishDate: string;
};

export type ContentfulBlog = {
  contentTypeId: "blogPost",
  fields: {
    title: EntryFieldTypes.Text,
    slug: EntryFieldTypes.Text,
    summary: EntryFieldTypes.Text,
    body: EntryFieldTypes.RichText,
    image: { fields: any },
    author: { fields: any },
    publishedOn: string,
  }
}