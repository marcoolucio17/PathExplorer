/**
 * Sort applicants by various criteria
 * @param {Array} applicants - Array of applicant objects
 * @param {string} sortBy - Sort criterion
 * @param {boolean} ascending - Sort direction
 * @returns {Array} - Sorted array of applicants
 */
export const sortApplicants = (applicants = [], sortOption = 'date_desc') => {
  const sorted = [...applicants];
  
  switch(sortOption) {
    case 'exp_asc': // Experience: Low to High
      return sorted.sort((a, b) => {
        const expA = parseInt(a.experience?.replace(/\D/g, '') || '0');
        const expB = parseInt(b.experience?.replace(/\D/g, '') || '0');
        return expA - expB;
      });
      
    case 'exp_desc': // Experience: High to Low
      return sorted.sort((a, b) => {
        const expA = parseInt(a.experience?.replace(/\D/g, '') || '0');
        const expB = parseInt(b.experience?.replace(/\D/g, '') || '0');
        return expB - expA;
      });
      
    case 'date_desc': // Newest First
      return sorted.sort((a, b) => {
        // Use applied date if available
        if (a.appliedDate && b.appliedDate) {
          return new Date(b.appliedDate) - new Date(a.appliedDate);
        }
        // Fallback to id
        return b.id.localeCompare(a.id);
      });
      
    case 'date_asc': // Oldest First
      return sorted.sort((a, b) => {
        // Use applied date if available
        if (a.appliedDate && b.appliedDate) {
          return new Date(a.appliedDate) - new Date(b.appliedDate);
        }
        // Fallback to id
        return a.id.localeCompare(b.id);
      });
      
    case 'match_desc': // Compatibility: High to Low
      return sorted.sort((a, b) => {
        const matchA = a.matchPercentage || 0;
        const matchB = b.matchPercentage || 0;
        return matchB - matchA;
      });
      
    case 'match_asc': // Compatibility: Low to High
      return sorted.sort((a, b) => {
        const matchA = a.matchPercentage || 0;
        const matchB = b.matchPercentage || 0;
        return matchA - matchB;
      });
      
    case 'name_asc': // Name: A to Z
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
      
    case 'name_desc': // Name: Z to A
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
      
    default:
      return sorted;
  }
};