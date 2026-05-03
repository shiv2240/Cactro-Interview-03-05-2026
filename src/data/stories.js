const now = new Date();
const subtractHours = (hours) => new Date(now.getTime() - hours * 60 * 60 * 1000).toISOString();

export const mockData = [
  {
    id: 'user1',
    username: 'alex_dev',
    avatar: 'https://i.pravatar.cc/150?img=11',
    stories: [
      { id: 's1', url: 'https://picsum.photos/id/1018/1080/1920', uploadedAt: subtractHours(2) },
      { id: 's2', url: 'https://picsum.photos/id/1015/1080/1920', uploadedAt: subtractHours(1) },
    ]
  },
  {
    id: 'user2',
    username: 'sarah.codes',
    avatar: 'https://i.pravatar.cc/150?img=5',
    stories: [
      { id: 's3', url: 'https://picsum.photos/id/1019/1080/1920', uploadedAt: subtractHours(5) },
      { id: 's3_old', url: 'https://picsum.photos/id/1014/1080/1920', uploadedAt: subtractHours(25) }, // Should be filtered out
    ]
  },
  {
    id: 'user3',
    username: 'tech_guru',
    avatar: 'https://i.pravatar.cc/150?img=33',
    stories: [
      { id: 's4', url: 'https://picsum.photos/id/1016/1080/1920', uploadedAt: subtractHours(12) },
      { id: 's5', url: 'https://picsum.photos/id/1025/1080/1920', uploadedAt: subtractHours(8) },
      { id: 's6', url: 'https://picsum.photos/id/1020/1080/1920', uploadedAt: subtractHours(3) },
    ]
  },
  {
    id: 'user4',
    username: 'react_native_fan',
    avatar: 'https://i.pravatar.cc/150?img=47',
    stories: [
      { id: 's7', url: 'https://picsum.photos/id/1035/1080/1920', uploadedAt: subtractHours(20) },
      { id: 's8', url: 'https://picsum.photos/id/1036/1080/1920', uploadedAt: subtractHours(18) },
    ]
  },
  {
    id: 'user5',
    username: 'ui_ux_designer',
    avatar: 'https://i.pravatar.cc/150?img=44',
    stories: [
      { id: 's9', url: 'https://picsum.photos/id/1040/1080/1920', uploadedAt: subtractHours(22) },
    ]
  }
];
