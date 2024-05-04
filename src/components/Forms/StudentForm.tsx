// import { useState } from "react";
// import { isBirthday } from "@/utils/etc";
// import Student from "@/interfaces/Student";
// import * as F from "./FormStyled";
// import { useAuth } from "@/contexts/AuthProvider";
// import { classList, clubList } from "@/constants";
// import { toast } from "react-toastify";
// import { useForm } from "react-hook-form";
// import { Link } from "react-router-dom";

// export default function StudentForm({
//   student,
//   isEdit,
//   onEdit,
// }: {
//   student: Student;
//   isEdit: boolean;
//   onEdit: (arg0: string, arg1: Object) => void;
// }) {

//   return (
//     <>
//       <F.InfoContainer>
//         <F.Container autoComplete="off">
//           <F.Fields disabled={isSubmitting}>
//             <F.Field>
//               <F.Label>이름</F.Label>
//               {isEdit ? (
//                 <F.Input
//                   id="korName"
//                   type="text"
//                   placeholder={student.korName}
//                   $isError={errors.korName ? true : false}
//                   {...register("korName", {
//                     required: true,
//                   })}
//                 />
//               ) : (
//                 <F.Data>{student.korName}</F.Data>
//               )}
//             </F.Field>
//             <F.Field>
//               <F.Label>상태</F.Label>
//               {isEdit ? (
//                 <F.Select
//                   id="status"
//                   $isError={errors.status ? true : false}
//                   {...register("status", {
//                     required: true,
//                   })}
//                 >
//                   <option id="active" value="active">
//                     재적✅
//                   </option>
//                   <option id="absent" value="absent">
//                     임시귀가🏠
//                   </option>
//                   <option id="hospital" value="hospital">
//                     병원진료🏥
//                   </option>
//                   <option id="discharged" value="discharged">
//                     퇴소❌
//                   </option>
//                 </F.Select>
//               ) : (
//                 <F.Data>
//                   {(() => {
//                     switch (student.status) {
//                       case "active":
//                         return "재적✅";
//                       case "absent":
//                         return "임시귀가🏠";
//                       case "hospital":
//                         return "병원진료🏥";
//                       case "discharged":
//                         return "퇴소❌";
//                       default:
//                         return "오류입니다.";
//                     }
//                   })()}
//                 </F.Data>
//               )}
//             </F.Field>
//             <F.Field>
//               <F.Label>학급</F.Label>
//               {isEdit ? (
//                 <F.Select
//                   id="className"
//                   $isError={errors.className ? true : false}
//                   {...register("className", {
//                     required: true,
//                     validate: (v) => classList.includes(v),
//                   })}
//                 >
//                   {classList?.map((className, i) => (
//                     <option key={i} id={className} value={className}>
//                       {className} 반
//                     </option>
//                   ))}
//                 </F.Select>
//               ) : (
//                 <F.Data>{student.className}</F.Data>
//               )}
//             </F.Field>

//             <F.Field>
//               <F.Label>기숙사 호실</F.Label>
//               {isEdit ? (
//                 <>
//                   <F.Input
//                     id="roomNum"
//                     type="number"
//                     inputMode="numeric"
//                     placeholder={student.roomNum.toString()}
//                     $isError={errors.roomNum ? true : false}
//                     {...register("roomNum", {
//                       required: true,
//                       min: {
//                         value: 100,
//                         message: "올바른 숫자를 입력해 주세요.",
//                       },
//                       max: {
//                         value: 1100,
//                         message: "올바른 숫자를 입력해 주세요.",
//                       },
//                     })}
//                   />
//                   {errors.roomNum && (
//                     <F.ErrorText>
//                       {errors.roomNum.message?.toString()}
//                     </F.ErrorText>
//                   )}
//                 </>
//               ) : (
//                 <F.Data>{student.roomNum}</F.Data>
//               )}
//             </F.Field>
//             <F.Field>
//               <F.Label>형제자매</F.Label>
//               {isEdit ? (
//                 <>
//                   <F.Input
//                     id="sibling"
//                     type="text"
//                     placeholder="이름을 정확히 입력하세요"
//                     $isError={errors.sibling ? true : false}
//                     {...register("sibling")}
//                   />
//                 </>
//               ) : (
//                 <F.Data>
//                   {student.sibling ? (
//                     <F.Phone>
//                       <Link to={"/?korName=" + student.sibling}>
//                         {student.sibling}
//                       </Link>
//                     </F.Phone>
//                   ) : (
//                     <></>
//                   )}
//                 </F.Data>
//               )}
//             </F.Field>
//             <F.Field>
//               <F.Label>동아리</F.Label>
//               {isEdit ? (
//                 <F.Select
//                   id="club"
//                   $isError={errors.club ? true : false}
//                   {...register("club")}
//                 >
//                   <option value="" />
//                   {clubList?.map((club, i) => (
//                     <option key={i} id={club} value={club}>
//                       {club}
//                     </option>
//                   ))}
//                 </F.Select>
//               ) : (
//                 <F.Data>
//                   {student.club ? (
//                     <F.Phone>
//                       <Link to={"/clubs/?club=" + student.club}>
//                         {student.club}
//                       </Link>
//                     </F.Phone>
//                   ) : (
//                     <></>
//                   )}
//                 </F.Data>
//               )}
//             </F.Field>
//             <F.Field>
//               <F.Label>학적</F.Label>
//               <F.ReadOnlyData>
//                 {student.school + " " + student.grade + "학년"}
//               </F.ReadOnlyData>
//             </F.Field>
//             <F.Field>
//               <F.Label>생년월일</F.Label>
//               <F.ReadOnlyData>
//                 {student.birthDate +
//                   (isBirthday(student.birthDate) ? "🎂" : "")}
//               </F.ReadOnlyData>
//             </F.Field>
//             <F.Field>
//               <F.Label>알레르기</F.Label>
//               <F.ReadOnlyData>{student.allergy}</F.ReadOnlyData>
//             </F.Field>
//             <F.Field>
//               <F.Label>상의 사이즈</F.Label>
//               <F.ReadOnlyData>{student.shirtSize}</F.ReadOnlyData>
//             </F.Field>
//           </F.Fields>
//           {/* <S.Field>
//             <S.Label>자택 주소</S.Label>
//             <S.ReadOnlyData>
//               {student.address + " (" + student.postNum + ")"}
//             </S.ReadOnlyData>
//           </S.Field> */}
//           <F.Field>
//             <F.Label>보호자 연락처</F.Label>
//             <F.ReadOnlyData>
//               <>
//                 {student.parent1Relation + ": " + student.parent1Phone}
//                 <br />
//                 {student.parent2Relation &&
//                   student.parent2Relation + ": " + student.parent2Phone}
//               </>
//             </F.ReadOnlyData>
//           </F.Field>
//         </F.Container>
//       </F.InfoContainer>
//     </>
//   );
// }
