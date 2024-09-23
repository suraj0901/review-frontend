import { ROLE } from "@/config/constant/role";
import { GenderEnum } from "../user/gender";

export interface Feedback {
  title: "";
}

export interface Question {
  id: number;
  title: string;
  feedbacks?: Feedback[];
}
export interface QuestionDTO extends Question {
  ReviewTemplateId: number | null;
  Feedback?: Feedback[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PerformanceReview {
  id: number;
  start_date: Date;
  end_date: Date;
  Questions?: Question[];
}

export interface PerformanceReviewDTO extends PerformanceReview {
  createdAt: Date;
  updatedAt: Date;
  ReviewTemplateId?: number | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  gender: GenderEnum;
  profile_image: string | null;
  role: ROLE;
  isEmailVerified: boolean;
}

export interface ReviewTemplateDTO {
  id: number;
  title: string;
  description: string;
  Questions?: QuestionDTO[];
  createdAt?: Date;
  updatedAt?: Date;
}
export interface Answers {
  title: string;
  QuestionId: number;
  ReviewId: number;
}
export interface ReviewDTO extends Review {
  ReviewTemplate: ReviewTemplateDTO;
  Answers: Answers[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: number;
  start_date: string;
  end_date: string;
  reviewTemplateId: number;
  revieweeId: number;
  Reviewers?: User[];
  Reviewee?: User;
}
