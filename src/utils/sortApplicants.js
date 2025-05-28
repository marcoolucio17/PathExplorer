/**
 * Sort applicants by many points
 * @param {Array} applicants - Array of applicant objects
 * @param {string} sortBy - Sort criterion
 * @param {boolean} ascending - Sort direction
 * @returns {Array} - Sorted array of applicants
 */
export const sortApplicants = (applicants = [], sortOption = 'date_desc') => {
  const sorted = [...applicants];
  
  switch(sortOption) {
    case 'exp_asc': //experience: Low to High
      return sorted.sort((a, b) => {
        const expA = parseInt(a.experience?.replace(/\D/g, '') || '0');
        const expB = parseInt(b.experience?.replace(/\D/g, '') || '0');
        return expA - expB;
      });
      
    case 'exp_desc': //experience: High to Low
      return sorted.sort((a, b) => {
        const expA = parseInt(a.experience?.replace(/\D/g, '') || '0');
        const expB = parseInt(b.experience?.replace(/\D/g, '') || '0');
        return expB - expA;
      });
      
    case 'date_desc': //newest First
      return sorted.sort((a, b) => {
        //use applied date if available
        if (a.appliedDate && b.appliedDate) {
          return new Date(b.appliedDate) - new Date(a.appliedDate);
        }
        //fallback to id
        return b.id.localeCompare(a.id);
      });
      
    case 'date_asc': //oldest First
      return sorted.sort((a, b) => {
        //use applied date if available
        if (a.appliedDate && b.appliedDate) {
          return new Date(a.appliedDate) - new Date(b.appliedDate);
        }
        //fallback to id
        return a.id.localeCompare(b.id);
      });
      
    case 'match_desc': //compatibility: High to Low
      return sorted.sort((a, b) => {
        const matchA = a.matchPercentage || 0;
        const matchB = b.matchPercentage || 0;
        return matchB - matchA;
      });
      
    case 'match_asc': //compatibility: Low to High
      return sorted.sort((a, b) => {
        const matchA = a.matchPercentage || 0;
        const matchB = b.matchPercentage || 0;
        return matchA - matchB;
      });
      
    case 'name_asc': //name: A to Z
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
      
    case 'name_desc': //name: Z to A
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
      
    default:
      return sorted;
  }
};

