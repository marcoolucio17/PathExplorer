/**
 * dummy applicant data for testing - well remove later on
 * @param {number} count - Number of applicants to generate
 * @returns {Array} - Array of dummy applicants
 */
export const generateDummyApplicants = (count = 20) => {
  const statuses = ['Pending', 'In Review', 'Accepted', 'Denied'];
  const skills = ['React', 'JavaScript', 'TypeScript', 'Node.js', 'CSS', 'HTML', 'Redux', 'Python', 'Java', 'C#'];
  const projects = ['PathExplorer', 'DataViz', 'TechConnect', 'CloudSync', 'MobileFirst'];
  
  return Array.from({ length: count }, (_, i) => {
    const randomSkillCount = Math.floor(Math.random() * 4) + 1;
    const selectedSkills = [];
    
    //random skills
    while (selectedSkills.length < randomSkillCount) {
      const skill = skills[Math.floor(Math.random() * skills.length)];
      if (!selectedSkills.includes(skill)) {
        selectedSkills.push(skill);
      }
    }
    
    return {
      id: `app-${i + 1}`,
      name: `Applicant ${i + 1}`,
      email: `applicant${i + 1}@example.com`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      skills: selectedSkills.map(skill => ({ nombre: skill })),
      project: projects[Math.floor(Math.random() * projects.length)],
      applications: [
        { proyecto: { pnombre: projects[Math.floor(Math.random() * projects.length)] } }
      ],
      experience: `${Math.floor(Math.random() * 10) + 1} years`,
      lastActive: `${Math.floor(Math.random() * 7) + 1} days ago`,
      appliedDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
      avatar: `/img/avatar-${(i % 5) + 1}.jpg`
    };
  });
};

/**
 * Get unique project names from applicant data
 * @param {Array} applicants - Array of applicant objects
 * @returns {Array} - Array of unique project names
 */
export const getUniqueProjects = (applicants = []) => {
  const projectSet = new Set();
  
  applicants.forEach(app => {
    if (app.project) {
      projectSet.add(app.project);
    }
    if (app.applications && Array.isArray(app.applications)) {
      app.applications.forEach(application => {
        if (application.proyecto && application.proyecto.pnombre) {
          projectSet.add(application.proyecto.pnombre);
        }
      });
    }
  });
  
  return Array.from(projectSet);
};

/**
 * Get unique skills from applicant data
 * @param {Array} applicants - Array of applicant objects
 * @returns {Array} - Array of unique skill names
 */
export const getUniqueSkills = (applicants = []) => {
  const skillSet = new Set();
  
  applicants.forEach(app => {
    if (app.skills && Array.isArray(app.skills)) {
      app.skills.forEach(skill => {
        if (typeof skill === 'string') {
          skillSet.add(skill);
        } else if (skill.nombre) {
          skillSet.add(skill.nombre);
        }
      });
    }
  });
  
  return Array.from(skillSet);
};