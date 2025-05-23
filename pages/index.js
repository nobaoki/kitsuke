import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit2, Eye, FileText, Users, MessageSquare, Settings, Calendar, DollarSign, TrendingUp, BarChart3, Lock, User, LogOut } from 'lucide-react';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit2, Eye, FileText, Users, MessageSquare, Settings, Calendar, DollarSign, TrendingUp, BarChart3, Lock, User, LogOut } from 'lucide-react';

const KimonoManagementSystem = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // ユーザー管理
  const [users, setUsers] = useState([
    { id: 1, email: 'admin@kimono.com', password: 'admin123', name: '管理者', role: 'admin', isActive: true },
    { id: 2, email: 'hori@kimono.com', password: 'hori123', name: '堀', role: 'staff', isActive: true },
    { id: 3, email: 'osasa@kimono.com', password: 'osasa123', name: '大佐々', role: 'staff', isActive: true },
    { id: 4, email: 'jyogahara@kimono.com', password: 'jyoga123', name: '城ヶ原', role: 'staff', isActive: true },
    { id: 5, email: 'aoki@kimono.com', password: 'aoki123', name: '青木', role: 'staff', isActive: true }
  ]);

  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    name: '',
    role: 'staff'
  });

  // メインアプリケーションの状態
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projects, setProjects] = useState([]);
  const [communications, setCommunications] = useState([]);
  const [estimates, setEstimates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // ログイン処理
  const handleLogin = () => {
    const user = users.find(u => 
      u.email === loginForm.email && 
      u.password === loginForm.password && 
      u.isActive
    );

    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setShowLogin(false);
      setLoginError('');
      setLoginForm({ email: '', password: '' });
    } else {
      setLoginError('メールアドレスまたはパスワードが正しくありません');
    }
  };

  // ログアウト処理
  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setShowLogin(true);
    setActiveTab('dashboard');
  };

  // ユーザー追加
  const addUser = () => {
    if (!newUser.email || !newUser.password || !newUser.name) {
      alert('すべての項目を入力してください');
      return;
    }

    if (users.some(u => u.email === newUser.email)) {
      alert('このメールアドレスは既に使用されています');
      return;
    }

    const user = {
      id: users.length + 1,
      ...newUser,
      isActive: true
    };

    setUsers([...users, user]);
    setNewUser({ email: '', password: '', name: '', role: 'staff' });
    alert('ユーザーが追加されました');
  };

  // ユーザーのアクティブ状態切り替え
  const toggleUserActive = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ));
  };

  // パスワード変更
  const changePassword = (userId, newPassword) => {
    if (!newPassword || newPassword.length < 6) {
      alert('パスワードは6文字以上で入力してください');
      return;
    }

    setUsers(users.map(user => 
      user.id === userId ? { ...user, password: newPassword } : user
    ));
    alert('パスワードが変更されました');
  };

  // マスターデータ
  const masterData = {
    prefectures: ['北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県', '栃木県'],
    scenes: ['お宮参り', '七五三', '成人式', '卒業式', '入学式', '結婚式', '葬式', 'アイドル', 'イベント'],
    clientTypes: ['個人', 'ホテル', '旅行会社', 'イベント会社', '芸能関連', 'キャバクラ', '教育関連', '美容室', '写真館'],
    staff: ['堀', '大佐々', '城ヶ原', '青木'],
    sources: ['電話問い合わせ', 'LINE問い合わせ', 'メール問い合わせ', '城ヶ原営業リスト', '大佐々営業リスト', '堀営業リスト', '青木営業リスト', '紹介', '新規営業'],
    statuses: ['案件発生（未連絡）', '商談中', '受注未実施未入金', '受注未実施入金済', '受注実施済未入金', '案件完了'],
    services: [
      { name: '[貸衣装・着付け]女性浴衣ベーシックプラン', price: 6500, unit: '名' },
      { name: '[貸衣装・着付け]女性浴衣ハイグレードプラン', price: 11000, unit: '名' },
      { name: '[貸衣装・着付け]女性着物ベーシックプラン', price: 6500, unit: '名' },
      { name: '[貸衣装・着付け]女性着物ハイグレードプラン', price: 11000, unit: '名' },
      { name: '[貸衣装・着付け]女性訪問着ベーシックプラン', price: 15000, unit: '名' },
      { name: '[貸衣装・着付け]女性訪問着ハイグレードプラン', price: 25000, unit: '名' },
      { name: '[貸衣装・着付け]女性訪問着プラチナプラン', price: 35000, unit: '名' },
      { name: '[貸衣装・着付け]女性袴ベーシックプラン', price: 25000, unit: '名' },
      { name: '[貸衣装・着付け]女性袴ハイグレードプラン', price: 35000, unit: '名' }
    ]
  };

  // サンプルデータ初期化
  useEffect(() => {
    if (isLoggedIn) {
      const sampleProjects = [
        {
          id: 1,
          clientName: '田中様',
          prefecture: '東京都',
          scene: '七五三',
          clientType: '個人',
          staff: '堀',
          source: '電話問い合わせ',
          generatedDate: '2025-05-20',
          implementationDate: '2025-06-15',
          status: '商談中',
          services: [{ name: '[貸衣装・着付け]女性着物ベーシックプラン', price: 6500, quantity: 1 }],
          totalAmount: 6500,
          confirmed: false
        },
        {
          id: 2,
          clientName: '佐藤様',
          prefecture: '神奈川県',
          scene: '成人式',
          clientType: '個人',
          staff: '大佐々',
          source: 'LINE問い合わせ',
          generatedDate: '2025-05-18',
          implementationDate: '2025-07-10',
          status: '受注未実施入金済',
          services: [{ name: '[貸衣装・着付け]女性訪問着ハイグレードプラン', price: 25000, quantity: 2 }],
          totalAmount: 50000,
          confirmed: true
        }
      ];
      setProjects(sampleProjects);

      const sampleCommunications = [
        {
          id: 1,
          projectId: 1,
          clientName: '田中様',
          date: '2025-05-21',
          content: '七五三の詳細について電話でご相談',
          from: '堀',
          to: '田中様',
          response: '6月中旬希望とのこと'
        }
      ];
      setCommunications(sampleCommunications);
    }
  }, [isLoggedIn]);

  // ログイン画面
  const renderLogin = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">着付け案件管理システム</h1>
          <p className="text-gray-600 mt-2">ログインしてください</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              メールアドレス
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@kimono.com"
              value={loginForm.email}
              onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              パスワード
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="パスワードを入力"
              value={loginForm.password}
              onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{loginError}</p>
            </div>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            ログイン
          </button>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">デモアカウント</h3>
          <div className="text-xs text-gray-600 space-y-1">
            <p><strong>管理者:</strong> admin@kimono.com / admin123</p>
            <p><strong>堀:</strong> hori@kimono.com / hori123</p>
            <p><strong>大佐々:</strong> osasa@kimono.com / osasa123</p>
            <p><strong>城ヶ原:</strong> jyogahara@kimono.com / jyoga123</p>
            <p><strong>青木:</strong> aoki@kimono.com / aoki123</p>
          </div>
        </div>
      </div>
    </div>
  );

  // ユーザー管理画面
  const renderUserManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">ユーザー管理</h2>
        <button
          onClick={() => setShowUserManagement(false)}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          戻る
        </button>
      </div>

      {/* 新規ユーザー追加 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">新規ユーザー追加</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="email"
            placeholder="メールアドレス"
            className="px-3 py-2 border border-gray-300 rounded-lg"
            value={newUser.email}
            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
          />
          <input
            type="password"
            placeholder="パスワード"
            className="px-3 py-2 border border-gray-300 rounded-lg"
            value={newUser.password}
            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
          />
          <input
            type="text"
            placeholder="名前"
            className="px-3 py-2 border border-gray-300 rounded-lg"
            value={newUser.name}
            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
          />
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg"
            value={newUser.role}
            onChange={(e) => setNewUser({...newUser, role: e.target.value})}
          >
            <option value="staff">スタッフ</option>
            <option value="admin">管理者</option>
          </select>
        </div>
        <button
          onClick={addUser}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          ユーザー追加
        </button>
      </div>

      {/* ユーザー一覧 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名前</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">メールアドレス</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">役割</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状態</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role === 'admin' ? '管理者' : 'スタッフ'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.isActive ? 'アクティブ' : '無効'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => toggleUserActive(user.id)}
                    className={`px-3 py-1 rounded text-xs ${
                      user.isActive 
                        ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {user.isActive ? '無効化' : '有効化'}
                  </button>
                  <button
                    onClick={() => {
                      const newPassword = prompt('新しいパスワードを入力してください:');
                      if (newPassword) changePassword(user.id, newPassword);
                    }}
                    className="px-3 py-1 rounded text-xs bg-blue-100 text-blue-700 hover:bg-blue-200"
                  >
                    PW変更
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ダッシュボード統計計算
  const dashboardStats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status !== '案件完了').length,
    totalRevenue: projects.reduce((sum, p) => sum + (p.confirmed ? p.totalAmount : 0), 0),
    completedProjects: projects.filter(p => p.status === '案件完了').length
  };

  // フィルタリング
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.scene.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // 新規案件フォーム
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProject, setNewProject] = useState({
    clientName: '',
    prefecture: '',
    scene: '',
    clientType: '',
    staff: '',
    source: '',
    generatedDate: new Date().toISOString().split('T')[0],
    implementationDate: '',
    status: '案件発生（未連絡）',
    services: [],
    totalAmount: 0,
    confirmed: false
  });

  const addService = () => {
    setNewProject(prev => ({
      ...prev,
      services: [...prev.services, { name: '', price: 0, quantity: 1 }]
    }));
  };

  const updateService = (index, field, value) => {
    const updatedServices = [...newProject.services];
    updatedServices[index][field] = value;
    
    if (field === 'name') {
      const service = masterData.services.find(s => s.name === value);
      if (service) {
        updatedServices[index].price = service.price;
      }
    }
    
    setNewProject(prev => ({
      ...prev,
      services: updatedServices,
      totalAmount: updatedServices.reduce((sum, s) => sum + (s.price * s.quantity), 0)
    }));
  };

  const saveNewProject = () => {
    const project = {
      ...newProject,
      id: projects.length + 1
    };
    setProjects([...projects, project]);
    setNewProject({
      clientName: '',
      prefecture: '',
      scene: '',
      clientType: '',
      staff: '',
      source: '',
      generatedDate: new Date().toISOString().split('T')[0],
      implementationDate: '',
      status: '案件発生（未連絡）',
      services: [],
      totalAmount: 0,
      confirmed: false
    });
    setShowNewProject(false);
  };

  // 見積書生成
  const generateEstimate = (project) => {
    const estimate = {
      id: estimates.length + 1,
      projectId: project.id,
      clientName: project.clientName,
      date: new Date().toISOString().split('T')[0],
      services: project.services,
      totalAmount: project.totalAmount,
      paymentTerms: '実施日の1週間前までに事前お振込み',
      validity: '発行から一ヶ月'
    };
    setEstimates([...estimates, estimate]);
    alert('見積書が生成されました');
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">総案件数</p>
              <p className="text-2xl font-bold text-blue-900">{dashboardStats.totalProjects}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">進行中案件</p>
              <p className="text-2xl font-bold text-green-900">{dashboardStats.activeProjects}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">確定売上</p>
              <p className="text-2xl font-bold text-purple-900">¥{dashboardStats.totalRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">完了案件</p>
              <p className="text-2xl font-bold text-orange-900">{dashboardStats.completedProjects}</p>
            </div>
            <Calendar className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">最近の案件</h3>
        <div className="space-y-3">
          {projects.slice(0, 5).map(project => (
            <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">{project.clientName}</p>
                <p className="text-sm text-gray-600">{project.scene} | {project.status}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">¥{project.totalAmount.toLocaleString()}</p>
                <p className="text-sm text-gray-600">{project.implementationDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="案件を検索..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">全ステータス</option>
            {masterData.statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setShowNewProject(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          新規案件
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">案件No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">依頼者名</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">シーン</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">実施日</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状況</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">金額</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {project.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {project.clientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {project.scene}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {project.implementationDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      project.status === '案件完了' ? 'bg-green-100 text-green-800' :
                      project.status === '商談中' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ¥{project.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => generateEstimate(project)}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        <FileText className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 新規案件追加モーダル */}
      {showNewProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">新規案件追加</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">依頼者名</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={newProject.clientName}
                  onChange={(e) => setNewProject({...newProject, clientName: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">都道府県</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={newProject.prefecture}
                  onChange={(e) => setNewProject({...newProject, prefecture: e.target.value})}
                >
                  <option value="">選択してください</option>
                  {masterData.prefectures.map(pref => (
                    <option key={pref} value={pref}>{pref}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">シーン</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={newProject.scene}
                  onChange={(e) => setNewProject({...newProject, scene: e.target.value})}
                >
                  <option value="">選択してください</option>
                  {masterData.scenes.map(scene => (
                    <option key={scene} value={scene}>{scene}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">依頼主種別</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={newProject.clientType}
                  onChange={(e) => setNewProject({...newProject, clientType: e.target.value})}
                >
                  <option value="">選択してください</option>
                  {masterData.clientTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">担当</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={newProject.staff}
                  onChange={(e) => setNewProject({...newProject, staff: e.target.value})}
                >
                  <option value="">選択してください</option>
                  {masterData.staff.map(staff => (
                    <option key={staff} value={staff}>{staff}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">発生経路</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={newProject.source}
                  onChange={(e) => setNewProject({...newProject, source: e.target.value})}
                >
                  <option value="">選択してください</option>
                  {masterData.sources.map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">実施日</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={newProject.implementationDate}
                  onChange={(e) => setNewProject({...newProject, implementationDate: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">状況</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={newProject.status}
                  onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                >
                  {masterData.statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">サービス内容</h3>
                <button
                  onClick={addService}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                >
                  サービス追加
                </button>
              </div>
              
              {newProject.services.map((service, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-lg col-span-2"
                    value={service.name}
                    onChange={(e) => updateService(index, 'name', e.target.value)}
                  >
                    <option value="">サービスを選択</option>
                    {masterData.services.map(s => (
                      <option key={s.name} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="数量"
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                    value={service.quantity}
                    onChange={(e) => updateService(index, 'quantity', parseInt(e.target.value) || 1)}
                  />
                  <div className="px-3 py-2 bg-gray-100 rounded-lg">
                    ¥{(service.price * service.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
              
              <div className="text-right mt-4">
                <p className="text-lg font-semibold">合計: ¥{newProject.totalAmount.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setShowNewProject(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button
                onClick={saveNewProject}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderCommunications = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">社内連絡</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          新規連絡
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">案件No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">取引先名</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">記入日</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">連絡事項</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {communications.map((comm) => (
              <tr key={comm.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {comm.projectId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {comm.clientName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {comm.date}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                  {comm.content}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {comm.from}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {comm.to}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderEstimates = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">見積書管理</h2>
      </div>

      <div className="grid gap-6">
        {estimates.map((estimate) => (
          <div key={estimate.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold mb-2">御見積書</h3>
                <p className="text-sm text-gray-600">御見積書番号: {estimate.id}</p>
                <p className="text-sm text-gray-600">作成日: {estimate.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">株式会社　出張着付け.com</p>
                <p className="text-sm">〒170-0005 東京都港区高輪4‐18‐12</p>
                <p className="text-sm">TEL 050-5444-0339</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="mb-2"><span className="font-medium">件名:</span> 出張着付けお見積り</p>
              <p className="mb-2"><span className="font-medium">お客様:</span> {estimate.clientName}</p>
              <p className="mb-2"><span className="font-medium">支払条件:</span> {estimate.paymentTerms}</p>
              <p className="mb-2"><span className="font-medium">有効期限:</span> {estimate.validity}</p>
            </div>

            <div className="border rounded-lg overflow-hidden mb-4">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">項目</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">単価</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">数量</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">小計</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {estimate.services.map((service, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm">{service.name}</td>
                      <td className="px-4 py-3 text-sm">¥{service.price.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm">{service.quantity}</td>
                      <td className="px-4 py-3 text-sm">¥{(service.price * service.quantity).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan="3" className="px-4 py-3 text-sm font-medium text-right">合計金額（税別）</td>
                    <td className="px-4 py-3 text-sm font-bold">¥{estimate.totalAmount.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                印刷
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                PDF出力
              </button>
            </div>
          </div>
        ))}

        {estimates.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>見積書がありません</p>
            <p className="text-sm">案件から見積書を生成してください</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderStaff = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">着付け師管理</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          着付け師追加
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">業務依頼メールテンプレート</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">タイトル</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              defaultValue="[出張着付け.com]着付け師業務依頼メール"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">本文</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg h-32"
              placeholder="着付け師への業務依頼メール本文を入力してください..."
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              保存
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              一括送信
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">着付け師一覧</h3>
        <div className="text-center py-8 text-gray-500">
          <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p>着付け師情報がありません</p>
          <p className="text-sm">着付け師を追加してください</p>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">システム設定</h2>

      <div className="grid gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">マスターデータ管理</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">都道府県</h4>
              <div className="space-y-1 max-h-32 overflow-y-auto border rounded p-2">
                {masterData.prefectures.map(pref => (
                  <div key={pref} className="text-sm py-1 px-2 bg-gray-50 rounded">{pref}</div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">シーン</h4>
              <div className="space-y-1 max-h-32 overflow-y-auto border rounded p-2">
                {masterData.scenes.map(scene => (
                  <div key={scene} className="text-sm py-1 px-2 bg-gray-50 rounded">{scene}</div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">依頼主種別</h4>
              <div className="space-y-1 max-h-32 overflow-y-auto border rounded p-2">
                {masterData.clientTypes.map(type => (
                  <div key={type} className="text-sm py-1 px-2 bg-gray-50 rounded">{type}</div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">担当者</h4>
              <div className="space-y-1 max-h-32 overflow-y-auto border rounded p-2">
                {masterData.staff.map(staff => (
                  <div key={staff} className="text-sm py-1 px-2 bg-gray-50 rounded">{staff}</div>
                ))}
              </div>
            </div>
          </div>
          
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            マスターデータ編集
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">サービス料金設定</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">サービス名</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">単価</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">単位</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {masterData.services.map((service, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {service.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ¥{service.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {service.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">
                        編集
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  // ログインしていない場合はログイン画面を表示
  if (!isLoggedIn) {
    return renderLogin();
  }

  // ユーザー管理画面表示時
  if (showUserManagement) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">着付け案件管理システム - ユーザー管理</h1>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">ログイン中: {currentUser.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="h-4 w-4" />
                  ログアウト
                </button>
              </div>
            </div>
          </div>
        </header>
        <div className="p-6">
          {renderUserManagement()}
        </div>
      </div>
    );
  }

  // メインアプリケーション
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">着付け案件管理システム</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">ログイン中: {currentUser.name}</span>
              {currentUser.role === 'admin' && (
                <button
                  onClick={() => setShowUserManagement(true)}
                  className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-800"
                >
                  <User className="h-4 w-4" />
                  ユーザー管理
                </button>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4" />
                ログアウト
              </button>
              <div className="text-sm text-gray-600">
                {new Date().toLocaleDateString('ja-JP')}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* サイドバー */}
        <nav className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                    activeTab === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <BarChart3 className="h-5 w-5" />
                  ダッシュボード
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                    activeTab === 'projects' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Calendar className="h-5 w-5" />
                  案件管理
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('communications')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                    activeTab === 'communications' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <MessageSquare className="h-5 w-5" />
                  社内連絡
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('estimates')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                    activeTab === 'estimates' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FileText className="h-5 w-5" />
                  見積書管理
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('staff')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                    activeTab === 'staff' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Users className="h-5 w-5" />
                  着付け師管理
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                    activeTab === 'settings' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  設定
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* メインコンテンツ */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'projects' && renderProjects()}
          {activeTab === 'communications' && renderCommunications()}
          {activeTab === 'estimates' && renderEstimates()}
          {activeTab === 'staff' && renderStaff()}
          {activeTab === 'settings' && renderSettings()}
        </main>
      </div>
    </div>
  );
};

export default KimonoManagementSystem;
