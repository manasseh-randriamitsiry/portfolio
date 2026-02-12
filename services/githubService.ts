import { Repository } from '../types';
import { GITHUB_USERNAME } from '../constants';

export const fetchRepositories = async (): Promise<Repository[]> => {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }
    const repos = await response.json();
    
    // Filter to only include the featured projects and enhance their descriptions
    const featuredRepoNames = ['fihirana-JFF', 'permah-mvvn', 'event_symfony'];
    const featuredRepos = repos.filter((repo: Repository) => 
      featuredRepoNames.includes(repo.name)
    );
    
    // Enhance descriptions for featured projects
    return featuredRepos.map((repo: Repository) => {
      const enhanced = { ...repo };
      switch(repo.name) {
        case 'fihirana-JFF':
          enhanced.description = "A comprehensive digital hymnal application featuring offline access to JFF hymns. Built with Flutter for cross-platform compatibility. Stack: Flutter, Dart, Offline Storage";
          break;
        case 'permah-mvvn':
          enhanced.description = "A Flutter MVVM architecture template demonstrating clean separation of concerns. Provides a solid foundation for scalable Flutter apps. Stack: Flutter, Dart, MVVM, Clean Architecture";
          break;
        case 'event_symfony':
          enhanced.description = "A full-featured event management backend built with Symfony. Handles event creation, attendee management, and scheduling. Stack: PHP, Symfony, MySQL, REST API";
          break;
      }
      return enhanced;
    });
  } catch (error) {
    console.error("Error fetching repos:", error);
    // Fallback data if API fails or limit reached
    return [
      {
        id: 828949007,
        name: "fihirana-JFF",
        description: "A comprehensive digital hymnal application featuring offline access to JFF hymns. Built with Flutter for cross-platform compatibility. Stack: Flutter, Dart, Offline Storage",
        html_url: `https://github.com/${GITHUB_USERNAME}/fihirana-JFF`,
        language: "Dart",
        stargazers_count: 2,
        updated_at: new Date().toISOString()
      },
      {
        id: 933098509,
        name: "permah-mvvn",
        description: "A Flutter MVVM architecture template demonstrating clean separation of concerns. Provides a solid foundation for scalable Flutter apps. Stack: Flutter, Dart, MVVM, Clean Architecture",
        html_url: `https://github.com/${GITHUB_USERNAME}/permah-mvvn`,
        language: "Dart",
        stargazers_count: 0,
        updated_at: new Date().toISOString()
      },
      {
        id: 925947735,
        name: "event_symfony",
        description: "A full-featured event management backend built with Symfony. Handles event creation, attendee management, and scheduling. Stack: PHP, Symfony, MySQL, REST API",
        html_url: `https://github.com/${GITHUB_USERNAME}/event_symfony`,
        language: "PHP",
        stargazers_count: 0,
        updated_at: new Date().toISOString()
      }
    ];
  }
};
