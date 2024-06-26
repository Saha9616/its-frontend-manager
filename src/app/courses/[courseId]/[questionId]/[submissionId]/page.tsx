import { getQuestionInfo } from "@/actions/getQuestionInfo";
import { getSubmission } from "@/actions/getSubmission";
import { getUserProps } from "@/actions/getUserProps";
import SubmissionViewContainer from "@/components/submission-view/SubmissionViewContainer";
import { redirect } from "next/navigation";

export default async function SubmissionView({
  params,
}: {
  params: { questionId: string; courseId: string; submissionId: string };
}) {
  const user = await getUserProps({
    includeSchool: false,
    includeCourses: false,
    includeSubmissions: false,
  });

  const question = await getQuestionInfo({
    questionId: params.questionId,
    courseId: params.courseId.toUpperCase(),
    schoolId: user.school_id,
  });

  if (!question) {
    redirect(`/courses/${params.courseId}`);
  }

  const submission = await getSubmission({
    submission_id: params.submissionId,
  });

  if (!submission) {
    redirect(`/courses/${params.courseId}`);
  }

  const submitted_program_text = await fetch(submission.submitted_program).then(
    (res) => res.text()
  );

  return (
    <SubmissionViewContainer
      code={submitted_program_text}
      submission={submission}
      question={question}
      user={user}
    ></SubmissionViewContainer>
  );
}
