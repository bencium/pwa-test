import type { NewsArticle } from '../types/news';

export const mockNewsData: NewsArticle[] = [
  {
    id: '1',
    title: 'Revolutionary AI System Achieves Breakthrough in Climate Modeling',
    summary: 'New machine learning algorithms provide unprecedented accuracy in predicting climate patterns, offering hope for better environmental planning.',
    content: 'Scientists at leading research institutions have developed an artificial intelligence system that represents a major breakthrough in climate modeling. The new system combines advanced machine learning algorithms with massive datasets to predict climate patterns with unprecedented accuracy. This development could revolutionize how we approach environmental planning and climate change mitigation strategies. The AI system processes satellite data, ocean temperature readings, and atmospheric measurements to generate predictions that are 40% more accurate than previous models.',
    author: 'Dr. Sarah Chen',
    publishedAt: '2024-01-15T10:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800',
    category: 'Technology',
    readTime: 4
  },
  {
    id: '2',
    title: 'Global Markets Rally as Economic Indicators Show Strong Recovery',
    summary: 'Major stock exchanges worldwide post significant gains following positive employment data and corporate earnings reports.',
    content: 'Financial markets around the world experienced a strong rally today as multiple economic indicators pointed to robust recovery. The Dow Jones Industrial Average gained 2.3%, while the S&P 500 rose 2.1%. European markets also saw substantial gains, with the FTSE 100 up 1.8% and the DAX increasing by 2.4%. The positive sentiment was driven by better-than-expected employment figures, strong corporate earnings, and optimistic forward guidance from major companies.',
    author: 'Michael Rodriguez',
    publishedAt: '2024-01-15T08:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    category: 'Business',
    readTime: 3
  },
  {
    id: '3',
    title: 'Championship Game Ends in Stunning Overtime Victory',
    summary: 'Underdog team secures championship title in thrilling overtime finish that had fans on their feet.',
    content: 'In one of the most memorable championship games in recent history, the underdog Wildcats defeated the heavily favored Eagles 28-21 in overtime. The game featured incredible individual performances, including a 300-yard passing performance by Wildcats quarterback Jake Morrison. The victory caps off a remarkable season for the Wildcats, who started the year with little expectations but rallied together to achieve the ultimate prize.',
    author: 'Emma Thompson',
    publishedAt: '2024-01-14T22:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800',
    category: 'Sports',
    readTime: 5
  },
  {
    id: '4',
    title: 'New Archaeological Discovery Rewrites Ancient History',
    summary: 'Excavation team uncovers 3,000-year-old artifacts that challenge existing theories about early civilizations.',
    content: 'A team of archaeologists working in the Mediterranean has made a discovery that could fundamentally change our understanding of ancient civilizations. The excavation revealed a complex of buildings and artifacts dating back 3,000 years, including advanced metalworking tools and sophisticated artwork. The findings suggest that early civilizations were more interconnected and technologically advanced than previously believed.',
    author: 'Prof. David Martinez',
    publishedAt: '2024-01-14T16:20:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800',
    category: 'Science',
    readTime: 6
  },
  {
    id: '5',
    title: 'Renewable Energy Initiative Launched in 50 Cities Worldwide',
    summary: 'Ambitious project aims to transition urban areas to 100% clean energy by 2030 through innovative solar and wind solutions.',
    content: 'A groundbreaking renewable energy initiative has been launched simultaneously in 50 major cities across six continents. The project, backed by international funding and technological partnerships, aims to achieve 100% clean energy in participating urban areas by 2030. The initiative includes innovative solar panel installations on public buildings, urban wind farms, and advanced battery storage systems.',
    author: 'Lisa Wang',
    publishedAt: '2024-01-14T14:10:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
    category: 'Environment',
    readTime: 4
  },
  {
    id: '6',
    title: 'Medical Breakthrough: New Treatment Shows Promise for Rare Disease',
    summary: 'Clinical trials reveal 85% success rate for experimental therapy targeting previously incurable genetic condition.',
    content: 'Medical researchers have announced promising results from clinical trials of an experimental treatment for a rare genetic disease that affects thousands worldwide. The gene therapy approach showed an 85% success rate in early trials, offering hope to patients who previously had no treatment options. The therapy works by correcting defective genes at the cellular level.',
    author: 'Dr. Amanda Foster',
    publishedAt: '2024-01-14T12:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800',
    category: 'Health',
    readTime: 5
  },
  {
    id: '7',
    title: 'Space Mission Captures Stunning Images of Distant Galaxy',
    summary: 'Latest space telescope data reveals intricate details of galaxy formation billions of light-years away.',
    content: 'The latest images from our most advanced space telescope have captured breathtaking details of a galaxy located 8 billion light-years from Earth. These observations provide unprecedented insights into how galaxies formed in the early universe. The images show complex star formation patterns and reveal the presence of supermassive black holes that influenced galactic evolution.',
    author: 'Dr. James Peterson',
    publishedAt: '2024-01-14T09:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1446776876896-3e62c5e3d1f0?w=800',
    category: 'Science',
    readTime: 4
  },
  {
    id: '8',
    title: 'Tech Giant Announces Major Investment in Quantum Computing',
    summary: 'Multi-billion dollar commitment aims to accelerate quantum research and bring practical applications to market.',
    content: 'A leading technology company has announced a $5 billion investment in quantum computing research and development over the next five years. The initiative will fund new research facilities, hire hundreds of quantum physicists and engineers, and accelerate the development of practical quantum applications in fields ranging from cryptography to drug discovery.',
    author: 'Alex Kim',
    publishedAt: '2024-01-13T15:20:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
    category: 'Technology',
    readTime: 3
  },
  {
    id: '9',
    title: 'Sustainable Fashion Brand Revolutionizes Textile Industry',
    summary: 'Innovative company develops biodegradable fabrics from agricultural waste, setting new environmental standards.',
    content: 'A pioneering fashion company has developed a revolutionary process for creating biodegradable textiles from agricultural waste materials. The innovation could significantly reduce the fashion industry environmental impact by eliminating synthetic materials and reducing waste. The new fabrics maintain the durability and aesthetic appeal of traditional materials while being completely compostable.',
    author: 'Maria Gonzalez',
    publishedAt: '2024-01-13T11:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    category: 'Environment',
    readTime: 4
  },
  {
    id: '10',
    title: 'International Summit Addresses Global Food Security Crisis',
    summary: 'World leaders gather to discuss innovative solutions for feeding growing population amid climate challenges.',
    content: 'Representatives from over 100 countries have convened for an international summit focused on addressing the growing global food security crisis. The three-day event brings together world leaders, agricultural experts, and technology innovators to discuss sustainable farming practices, climate-resistant crops, and distribution strategies that could feed the worlds growing population.',
    author: 'Robert Taylor',
    publishedAt: '2024-01-13T08:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800',
    category: 'Politics',
    readTime: 5
  },
  {
    id: '11',
    title: 'Breakthrough Battery Technology Extends Electric Vehicle Range',
    summary: 'New solid-state batteries promise 500-mile range and 10-minute charging for next-generation electric cars.',
    content: 'Researchers have developed a revolutionary solid-state battery technology that could transform the electric vehicle industry. The new batteries offer a 500-mile range on a single charge and can be recharged to 80% capacity in just 10 minutes. This breakthrough addresses the two main concerns about electric vehicles: range anxiety and charging time.',
    author: 'Dr. Jennifer Lee',
    publishedAt: '2024-01-12T16:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=800',
    category: 'Technology',
    readTime: 4
  },
  {
    id: '12',
    title: 'Cultural Festival Celebrates Diversity in Urban Communities',
    summary: 'Annual event showcases traditions from over 30 countries, promoting unity through cultural exchange.',
    content: 'The annual International Cultural Festival brought together communities from over 30 countries to celebrate diversity and promote cultural understanding. The three-day event featured traditional music, dance performances, authentic cuisine, and art exhibitions. Organizers report record attendance as families from different backgrounds came together to learn about and appreciate each others traditions.',
    author: 'Carlos Rivera',
    publishedAt: '2024-01-12T14:20:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=800',
    category: 'Culture',
    readTime: 3
  },
  {
    id: '13',
    title: 'Mental Health Apps Show Effectiveness in Clinical Studies',
    summary: 'Research demonstrates that digital therapy platforms can significantly reduce anxiety and depression symptoms.',
    content: 'A comprehensive study involving 10,000 participants has shown that mental health applications can be as effective as traditional therapy for treating mild to moderate anxiety and depression. The research, conducted over 18 months, found that users of digital therapy platforms showed significant improvement in mental health outcomes when used consistently.',
    author: 'Dr. Rachel Green',
    publishedAt: '2024-01-12T10:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800',
    category: 'Health',
    readTime: 5
  },
  {
    id: '14',
    title: 'Young Entrepreneur Launches Social Impact Startup',
    summary: '22-year-old founder creates platform connecting local businesses with community volunteer programs.',
    content: 'A 22-year-old college graduate has launched a social impact startup that connects local businesses with community volunteer programs. The platform has already facilitated over 1,000 volunteer hours and raised $50,000 for local charities. The innovative approach demonstrates how technology can be used to strengthen community bonds and create positive social change.',
    author: 'Nicole Adams',
    publishedAt: '2024-01-11T17:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800',
    category: 'Business',
    readTime: 3
  },
  {
    id: '15',
    title: 'Marine Biologists Discover New Species in Deep Ocean',
    summary: 'Expedition to unexplored ocean depths reveals previously unknown creatures adapted to extreme conditions.',
    content: 'A deep-sea expedition has discovered five new species of marine life in the Pacific Ocean trenches. The creatures, found at depths exceeding 6,000 meters, display remarkable adaptations to extreme pressure and lack of sunlight. The discovery provides new insights into evolution and the potential for life in extreme environments, including other planets.',
    author: 'Dr. Thomas Wilson',
    publishedAt: '2024-01-11T13:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800',
    category: 'Science',
    readTime: 4
  },
  {
    id: '16',
    title: 'Urban Farming Project Transforms City Landscapes',
    summary: 'Vertical gardens and rooftop farms provide fresh produce while reducing urban heat and improving air quality.',
    content: 'A citywide urban farming initiative has transformed vacant lots and rooftops into productive agricultural spaces. The project not only provides fresh, locally-grown produce to urban communities but also helps reduce the urban heat island effect and improves air quality. Over 200 sites have been established, producing thousands of pounds of vegetables annually.',
    author: 'Dr. Susan Brown',
    publishedAt: '2024-01-11T09:20:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
    category: 'Environment',
    readTime: 4
  },
  {
    id: '17',
    title: 'Professional Gaming League Breaks Viewership Records',
    summary: 'Esports championship draws 50 million viewers worldwide, demonstrating the growing popularity of competitive gaming.',
    content: 'The annual Global Gaming Championship has set new viewership records with over 50 million people watching the finals worldwide. The tournament featured players from 25 countries competing for a $2 million prize pool. The event highlights the rapid growth of esports as a mainstream entertainment medium and its increasing recognition as a legitimate sport.',
    author: 'Kevin Park',
    publishedAt: '2024-01-10T20:10:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800',
    category: 'Sports',
    readTime: 3
  },
  {
    id: '18',
    title: 'Educational Technology Improves Learning Outcomes in Rural Schools',
    summary: 'AI-powered learning platforms help bridge educational gaps in underserved communities.',
    content: 'A pilot program using AI-powered educational technology has shown remarkable success in improving learning outcomes in rural schools. Students using the adaptive learning platforms showed 35% greater improvement in math and reading scores compared to traditional methods. The technology personalizes learning experiences and provides teachers with detailed analytics about student progress.',
    author: 'Dr. Patricia Davis',
    publishedAt: '2024-01-10T15:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    category: 'Education',
    readTime: 5
  },
  {
    id: '19',
    title: 'Innovative Housing Project Addresses Urban Affordability Crisis',
    summary: '3D-printed homes and modular construction techniques create affordable housing solutions for growing cities.',
    content: 'An innovative housing project utilizing 3D-printing technology and modular construction has successfully created affordable homes in urban areas facing housing crises. The project reduces construction costs by 40% while maintaining quality and sustainability standards. The homes are designed to be energy-efficient and can be constructed in half the time of traditional building methods.',
    author: 'Mark Johnson',
    publishedAt: '2024-01-10T11:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800',
    category: 'Business',
    readTime: 4
  },
  {
    id: '20',
    title: 'Climate Scientists Report Positive Trends in Ocean Recovery',
    summary: 'New data shows marine ecosystems responding positively to conservation efforts and pollution reduction measures.',
    content: 'Recent ocean monitoring data reveals encouraging signs of marine ecosystem recovery in several regions worldwide. Scientists report increases in fish populations, coral reef regeneration, and improved water quality in areas where conservation measures have been implemented. The positive trends demonstrate that coordinated environmental protection efforts can yield measurable results.',
    author: 'Dr. Elena Vasquez',
    publishedAt: '2024-01-09T16:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800',
    category: 'Environment',
    readTime: 5
  }
];