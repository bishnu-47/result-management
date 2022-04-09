const ResultDataPreview = ({ resultData }) => {
  // styles
  const spanKey = "font-bold mx-3";

  return (
    <>
      <div>
        <span className={spanKey}>Student Name:</span>
        <span>{resultData.studentName}</span>
      </div>

      <div>
        <span className={spanKey}>Enrollment Number:</span>
        <span>{resultData.enrollNo}</span>
      </div>

      <div>
        <span className={spanKey}>Branch:</span>
        <span>{resultData.branch}</span>
      </div>

      <div>
        <span className={spanKey}>Semester:</span>
        <span>{resultData.semester}</span>
      </div>

      <div>
        <span className={spanKey}>Session:</span>
        <span>{resultData.session}</span>
      </div>

      <div>
        <span className={spanKey}>Exam Type:</span>
        <span>{resultData.examType}</span>
      </div>

      <div>
        <span className={spanKey}>Percentage:</span>
        <span>{resultData.percentage}</span>
      </div>

      <p className={spanKey + " mt-5 border-t-2 border-dashed"}>Marks:</p>
      {resultData.subjects.map((subject) => (
        <div key={subject.subjectCode}>
          <span className={spanKey}>{subject.subjectName}:</span>
          <span>
            {subject.marks} / {subject.fullMarks}
          </span>
        </div>
      ))}
    </>
  );
};

export default ResultDataPreview;
