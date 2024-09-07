// "use client";
// import { useState, ChangeEvent } from "react";
// import leaderBoardData from "../data/final.json";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { SVGProps } from "react";

// function ArrowLeftIcon(props: SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m12 19-7-7 7-7" />
//       <path d="M19 12H5" />
//     </svg>
//   );
// }

// function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M5 12h14" />
//       <path d="m12 5 7 7-7 7" />
//     </svg>
//   );
// }

// function SearchIcon(props: SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="11" cy="11" r="8" />
//       <path d="m21 21-4.3-4.3" />
//     </svg>
//   );
// }

// export default function LeaderboardUI() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedParticipant, setSelectedParticipant] = useState<
//     null | (typeof leaderBoardData)[0]
//   >(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const entriesPerPage = 5;

//   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//     setCurrentPage(1);
//   };

//   const indexOfLastEntry = currentPage * entriesPerPage;
//   const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;

//   const filteredData = leaderBoardData.filter((participant) =>
//     participant.handle.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const currentEntries = filteredData.slice(
//     indexOfFirstEntry,
//     indexOfLastEntry
//   );

//   const nextPage = () => {
//     setCurrentPage(currentPage + 1);
//   };

//   const previousPage = () => {
//     setCurrentPage(currentPage - 1);
//   };

//   const handleUsernameClick = (participant: any) => {
//     setSelectedParticipant(participant);
//     setIsDialogOpen(true);
//   };

//   return (
//     <div className="w-full max-w-3xl mx-auto p-6 md:p-10">
//       <div className="flex items-center justify-between mb-6">
//         <div className="relative">
//           <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
//           <Input
//             type="text"
//             placeholder="Search users..."
//             value={searchTerm}
//             onChange={handleSearchChange}
//             className="pl-10 pr-4 py-2 rounded-lg text-gray-700 bg-white border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
//           />
//         </div>
//       </div>
//       <div className="border-blue-300 border rounded-lg overflow-hidden">
//         <div className="grid grid-cols-[3fr_1fr_1fr] gap-4 p-4 bg-blue-100 text-blue-900 font-medium">
//           <div className="flex items-center">Username</div>
//           <div className="flex items-center justify-end">Questions Solved</div>
//           <div className="flex items-center justify-end">Rank</div>
//         </div>
//         <div className="divide-y divide-blue-300">
//           {currentEntries.map((participant, index) => (
//             <div
//               key={index}
//               className="grid grid-cols-[3fr_1fr_1fr] gap-4 p-4 bg-white hover:bg-blue-50 text-blue-900 transition-colors hover:scale-[1.01] border border-blue-300"
//               onClick={() => handleUsernameClick(participant)}
//             >
//               <div className="flex items-center gap-4 cursor-pointer">
//                 <Avatar className="w-10 h-10 rounded-full bg-gray-200 text-gray-600">
//                   <AvatarImage
//                     src="/user.svg"
//                     alt="User Avatar"
//                     className="opacity-50"
//                   />
//                 </Avatar>
//                 <div>{participant.handle}</div>
//               </div>
//               <div className="flex items-center justify-start">
//                 {participant.solved_count} / 4
//               </div>
//               <div className="flex items-center justify-end">
//                 {indexOfFirstEntry + index + 1}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="flex justify-between items-center mt-6">
//         <Button
//           variant="outline"
//           className="gap-2 border-blue-300 text-blue-600 hover:bg-blue-200"
//           onClick={previousPage}
//           disabled={currentPage === 1}
//         >
//           <ArrowLeftIcon className="w-4 h-4" />
//           Previous Page
//         </Button>
//         <Button
//           variant="outline"
//           className="gap-2 border-blue-300 text-blue-600 hover:bg-blue-200"
//           onClick={nextPage}
//           disabled={indexOfLastEntry >= filteredData.length}
//         >
//           Next Page
//           <ArrowRightIcon className="w-4 h-4" />
//         </Button>
//       </div>

//       <div className="px-8 ">
//         {selectedParticipant && (
//           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//             <DialogContent className="bg-white text-blue-900 rounded-lg p-6">
//               <DialogHeader>
//                 <DialogTitle>{selectedParticipant.handle}</DialogTitle>
//               </DialogHeader>
//               <p className="mb-4">
//                 {selectedParticipant.handle} has solved{" "}
//                 {selectedParticipant.solved_count} problems.
//               </p>
//               <ul className="list-disc list-inside">
//                 {selectedParticipant.solved_problems.map(
//                   (problem: any, idx: number) => (
//                     <li key={idx}>
//                       {problem.problem} - Solved on {problem.solved_time}
//                     </li>
//                   )
//                 )}
//               </ul>
//             </DialogContent>
//           </Dialog>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, ChangeEvent } from "react";
import leaderBoardData from "../data/final.json";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SVGProps } from "react";

function ArrowLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export default function LeaderboardUI() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [selectedParticipant, setSelectedParticipant] = useState<
    null | (typeof leaderBoardData)[0]
  >(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleEntriesPerPageChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;

  const filteredData = leaderBoardData.filter((participant) =>
    participant.handle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentEntries = filteredData.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleUsernameClick = (participant: any) => {
    setSelectedParticipant(participant);
    setIsDialogOpen(true);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-10">
      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 rounded-lg text-gray-700 bg-white border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div className="flex justify-center items-center">
          <label htmlFor="entriesPerPage" className="hidden md:block mr-2 text-gray-700">
            Entries per page:
          </label>
          <select
            id="entriesPerPage"
            value={entriesPerPage}
            onChange={handleEntriesPerPageChange}
            className="border border-blue-300 rounded-lg py-2 px-4 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
      <div className="border-blue-300 border rounded-lg overflow-hidden">
        <div className="grid grid-cols-[3fr_1fr_1fr] gap-4 p-4 bg-blue-100 text-blue-900 font-medium">
          <div className="flex items-center">Username</div>
          <div className="flex items-center justify-end">Questions Solved</div>
          <div className="flex items-center justify-end">Rank</div>
        </div>
        <div className="divide-y divide-blue-300">
          {currentEntries.map((participant, index) => (
            <div
              key={index}
              className="grid grid-cols-[3fr_1fr_1fr] gap-4 p-4 bg-white hover:bg-blue-50 text-blue-900 transition-colors hover:scale-[1.01] border border-blue-300"
              onClick={() => handleUsernameClick(participant)}
            >
              <div className="flex items-center gap-4 cursor-pointer">
                <Avatar className="w-10 h-10 rounded-full bg-gray-200 text-gray-600">
                  <AvatarImage
                    src="/user.svg"
                    alt="User Avatar"
                    className="opacity-50"
                  />
                </Avatar>
                <div>{participant.handle}</div>
              </div>
              <div className="flex items-center justify-start">
                {participant.solved_count} / 4
              </div>
              <div className="flex items-center justify-end">
                {indexOfFirstEntry + index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center mt-6">
        <Button
          variant="outline"
          className="gap-2 border-blue-300 text-blue-600 hover:bg-blue-200"
          onClick={previousPage}
          disabled={currentPage === 1}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Previous Page
        </Button>
        <Button
          variant="outline"
          className="gap-2 border-blue-300 text-blue-600 hover:bg-blue-200"
          onClick={nextPage}
          disabled={indexOfLastEntry >= filteredData.length}
        >
          Next Page
          <ArrowRightIcon className="w-4 h-4" />
        </Button>
      </div>

      <div className="px-8 ">
        {selectedParticipant && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="bg-white text-blue-900 rounded-lg p-6">
              <DialogHeader>
                <DialogTitle>{selectedParticipant.handle}</DialogTitle>
              </DialogHeader>
              <p className="mb-4">
                {selectedParticipant.handle} has solved{" "}
                {selectedParticipant.solved_count} problems.
              </p>
              <ul className="list-disc list-inside">
                {selectedParticipant.solved_problems.map(
                  (problem: any, idx: number) => (
                    <li key={idx}>
                      {problem.problem} - Solved on {problem.solved_time}
                    </li>
                  )
                )}
              </ul>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
