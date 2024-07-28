export interface Feedback {
  title: "";
}

export interface Question {
  title: string;
  feedbacks?: Feedback[];
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
